import { User } from '@prisma/client';
import { get } from '@vercel/edge-config';
import { revalidateTag } from 'next/cache';
import { NextAuthOptions, Session, getServerSession } from 'next-auth';
import { prisma } from './db';

// Constantes
export const config = {
  weatherApi: {
    key: process.env.WEATHER_API_KEY,
    revalidate: 3600 * 0.5, // 1/2 Hora
    revalidateSearch: 3600 * 24 * 7 // 7 días
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    },
    secret: process.env.secret as string
  },
  rateLimits: {
    formAnswer: 30, // Minutos
    maxHoursOut: 12 // Horas a futuro
  }
};

export const Clothes = {
  Upper: {
    value: 'upper',
    shirt: {
      value: 'shirt',
      displayName: 'Remera',
      emoji: '👕'
    },
    hoodie: { value: 'hoodie', displayName: 'Remera & Bucito', emoji: '🧥' },
    jacket: {
      value: 'jacket',
      displayName: 'Remera, Bucito & Campera',
      emoji: '🧥+'
    }
  },
  Lower: {
    value: 'lower',
    shorts: { value: 'shorts', displayName: 'Shorts', emoji: '🩳' },
    pants: { value: 'pants', displayName: 'Pantalones Largos', emoji: '👖' }
  }
};

export function getLower(clothe: LowerType): ClotheDetails {
  return Clothes.Lower[clothe];
}

export function getUpper(clothe: UpperType): ClotheDetails {
  return Clothes.Upper[clothe];
}

// Querys

export const getUser = async (
  authOptions: NextAuthOptions
): Promise<{ user: User; session: Session | null }> => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    }
  });

  if (!user) {
    throw new Error("User doesn't exist in database");
  }

  return { user, session };
};

export async function getUserCityWeather(
  user: User,
  noRefetch: boolean = false
): Promise<WeatherResponse> {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('lat', user.cityLat.toString());
  url.searchParams.append('lon', user.cityLon.toString());
  url.searchParams.append('appid', config.weatherApi.key || 'undefined');
  url.searchParams.append('units', 'metric');
  url.searchParams.append('lang', 'es');
  const res = await fetch(url.toString(), {
    next: {
      revalidate: config.weatherApi.revalidate,
      tags: [`weather:${user.cityName}-${user.cityCountry}`]
    }
  });
  const data = (await res.json()) as WeatherResponse;
  // Si la data fue fetcheada hace mas de N minutos, refetchear.
  if (
    Date.now() - data.dt * 1000 > config.weatherApi.revalidate * 1000 &&
    !noRefetch
  ) {
    revalidateTag(`weather:${user.cityName}-${user.cityCountry}`);
    console.info(
      `> Revalidando: 'weather:${user.cityName}-${user.cityCountry}' `
    );
    return getUserCityWeather(user, true);
  }
  return data;
}

export async function getUserCityForecast(
  user: User,
  count: number = 6,
  noRefetch: boolean = false
): Promise<ForecastResponse> {
  const url = new URL('https://api.openweathermap.org/data/2.5/forecast');
  // const url = new URL(
  //   'https://pro.openweathermap.org/data/2.5/forecast/hourly'
  // );
  url.searchParams.append('lat', user.cityLat.toString());
  url.searchParams.append('lon', user.cityLon.toString());
  url.searchParams.append('appid', config.weatherApi.key || 'undefined');
  url.searchParams.append('cnt', count.toString());
  url.searchParams.append('mode', 'json');
  url.searchParams.append('units', 'metric');
  url.searchParams.append('lang', 'es');
  const res = await fetch(url.toString(), {
    next: {
      revalidate: config.weatherApi.revalidate,
      tags: [
        `forecast:${user.cityName}-${user.cityCountry}-${count.toString()}`
      ]
    }
  });
  const data = (await res.json()) as ForecastResponse;

  // Si la data fue fetcheada hace mas de N minutos, refetchear.
  if (
    Date.now() - data.list[0].dt * 1000 > config.weatherApi.revalidate &&
    !noRefetch
  ) {
    revalidateTag(
      `forecast:${user.cityName}-${user.cityCountry}-${count.toString()}`
    );
    console.info(
      `> Revalidando: 'forecast:${user.cityName}-${
        user.cityCountry
      }-${count.toString()}' `
    );
    return getUserCityForecast(user, count, true);
  }
  return data;
}

export async function searchCity(query: string): Promise<CityResponse[]> {
  const url = new URL('http://api.openweathermap.org/geo/1.0/direct');
  url.searchParams.append('q', query);
  url.searchParams.append('limit', '5');
  url.searchParams.append('appid', config.weatherApi.key || 'undefined');
  const res = await fetch(url.toString(), {
    next: {
      revalidate: config.weatherApi.revalidateSearch,
      tags: ['search']
    }
  });
  const data = await res.json();
  return data;
}

export async function reverseSearchCity(
  lat: number,
  lon: number
): Promise<CityResponse[]> {
  const url = new URL('http://api.openweathermap.org/geo/1.0/reverse');
  url.searchParams.append('lat', lat.toString());
  url.searchParams.append('lon', lon.toString());
  url.searchParams.append('limit', '5');
  url.searchParams.append('appid', config.weatherApi.key || 'undefined');
  const res = await fetch(url.toString(), {
    next: {
      revalidate: config.weatherApi.revalidateSearch,
      tags: ['reversesearch']
    }
  });
  const data = await res.json();
  return data;
}

export function formattedStringByCity(city: CityResponse): string {
  return `${city.name}, ${city.state ? `${city.state}, ` : ''}${city.country}`;
}

export async function userAnswered(user: User): Promise<{
  date: Date;
} | null> {
  const lastReport = await prisma.report.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: new Date(Date.now() - 1000 * 60 * config.rateLimits.formAnswer)
      }
    },
    select: {
      date: true
    }
  });

  return lastReport;
}

export async function getOutfitByActualWeather(user: User): Promise<Outfit> {
  const clima = await getUserCityWeather(user);

  const tempmin = clima.main.temp_min;
  const tempmax = clima.main.temp_max;
  // const temp = weather.main.temp;

  const outfit = await getOutfitByWeatherRange(user, tempmin, tempmax);

  return outfit;
}

export async function getOutfitByFutureWeather(
  user: User,
  hoursOutRaw: number
): Promise<FutureResponse> {
  const hoursOut =
    hoursOutRaw > config.rateLimits.maxHoursOut
      ? config.rateLimits.maxHoursOut
      : hoursOutRaw; // Si se escapa del limite, setear el maximo

  const clima = await getUserCityForecast(user, hoursOut);
  clima.list.map(c => {
    return {
      temp_min: c.main.temp_min,
      temp_max: c.main.temp_max
    };
  });
  // The idea here is to store, from the weather forecast list, the item with the lowest temp. But from this particular hour, store the min and max
  const { lowestSegmentMin, lowestSegmentMax } = clima.list.reduce(
    (acc, segment) => {
      const segmentMin = segment.main.temp_min;
      const segmentMax = segment.main.temp_max;
      if (segmentMin < acc.lowestSegmentMin) {
        acc.lowestSegmentMin = segmentMin;
        acc.lowestSegmentMax = segmentMax;
      }
      return acc;
    },
    { lowestSegmentMin: Infinity, lowestSegmentMax: Infinity }
  );

  const { highestSegmentMin, highestSegmentMax } = clima.list.reduce(
    (acc, segment) => {
      const segmentMin = segment.main.temp_min;
      const segmentMax = segment.main.temp_max;
      if (segmentMin > acc.highestSegmentMin) {
        acc.highestSegmentMin = segmentMin;
        acc.highestSegmentMax = segmentMax;
      }
      return acc;
    },
    { highestSegmentMin: -Infinity, highestSegmentMax: -Infinity }
  );

  // grab the min and max temp from the forecast

  const outfitForLowestSegment = await getOutfitByWeatherRange(
    user,
    lowestSegmentMin,
    lowestSegmentMax
  );

  const outfitForHighestSegment = await getOutfitByWeatherRange(
    user,
    highestSegmentMin,
    highestSegmentMax
  );

  return { lowest: outfitForLowestSegment, highest: outfitForHighestSegment };
}

export async function getOutfitByWeatherRange(
  user: User,
  min: number,
  max: number,
  retryCount: number = 0
): Promise<Outfit> {
  const reports = await prisma.report.groupBy({
    by: ['lower', 'upper'],
    where: {
      userId: user.id,
      temp: {
        gte: min,
        lte: max
      }
    },
    _count: {
      lower: true,
      upper: true
    },
    orderBy: {
      _count: {
        date: 'desc'
      }
    },
    take: 1
  });

  if (!reports.length && retryCount <= 3) {
    // Ampliar la brecha de busqueda
    return getOutfitByWeatherRange(user, min - 0.5, max + 0.5, retryCount + 1);
  }

  if (!reports.length) {
    // No se encontraron resultados, y no le quedan mas reintentos
    return {
      lower: null,
      upper: null
    };
  }

  const lower = reports[0].lower as LowerType;
  const upper = reports[0].upper as UpperType;

  return {
    lower,
    upper
  };
}

export async function getAviso(): Promise<AvisoResponse> {
  const aviso = await get('aviso_qmp');
  if (!aviso) {
    return {
      mensaje: ''
    };
  }
  return {
    mensaje: aviso.toString()
  };
}

interface AvisoResponse {
  mensaje: string;
}

// Helper functions

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export function getDay(date: Date): string {
  return date.toLocaleDateString('es-AR', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit'
  });
}

export function getHour(date: Date): string {
  return date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function round(temp: number): number {
  return Math.round(temp);
}

export function emojiByWeather(icon: string): string {
  const emojisCode: Record<string, string> = {
    // Day
    '01d': '☀️',
    '02d': '🌤️',
    '03d': '⛅',
    '04d': '☁️',
    '09d': '🌦️',
    '10d': '🌧️☔',
    '11d': '⛈️',
    '13d': '🌨️❄️',
    '50d': '🌁',
    // Night
    '01n': '🌑',
    '02n': '🌤️ 🌑',
    '03n': '⛅ 🌑',
    '04n': '️️☁️',
    '09n': '🌦️',
    '10n': '🌧️☔',
    '11n': '⛈️',
    '13n': '🌨️❄️',
    '50n': '🌁'
  };
  const emoji = emojisCode[icon];

  if (emoji) {
    return emoji;
  }

  return '🌎';
}

export const proxy = (url: string): string => {
  const proxyUrl = 'i.ezegatica.com/proxy';
  return `https://${proxyUrl}?url=${url}`;
};

// Tipados
export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}

export interface CityResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export interface FutureResponse {
  highest: Outfit;
  lowest: Outfit;
}

export type UpperType = 'shirt' | 'hoodie' | 'jacket';
export type LowerType = 'shorts' | 'pants';

export type Outfit =
  | {
      upper: UpperType;
      lower: LowerType;
    }
  | {
      upper: null;
      lower: null;
    };

export interface ClotheDetails {
  value: string;
  displayName: string;
  emoji: string;
}
