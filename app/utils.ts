import { User } from '@prisma/client';
import { NextAuthOptions, Session, getServerSession } from 'next-auth';
import { prisma } from './db';

export function round(temp: number): number {
  return Math.round(temp);
}
export const config = {
  weatherApi: {
    key: process.env.WEATHER_API_KEY
  },
  auth: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    },
    secret: process.env.secret as string
  },
  form: {
    cooldown: 30 // minutos
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
    hoodie: { value: 'hoodie', displayName: 'Bucito', emoji: '🧥' },
    jacket: { value: 'jacket', displayName: 'Campera', emoji: '🧥+' }
  },
  Lower: {
    value: 'lower',
    shorts: { value: 'shorts', displayName: 'Shorts', emoji: '🩳' },
    pants: { value: 'pants', displayName: 'Pantalones Largos', emoji: '👖' }
  }
};

export type UpperType = 'shirt' | 'hoodie' | 'jacket';
export type LowerType = 'shorts' | 'pants';

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

export async function getUserCityWeather(user: User): Promise<WeatherResponse> {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather');
  url.searchParams.append('lat', user.cityLat.toString());
  url.searchParams.append('lon', user.cityLon.toString());
  url.searchParams.append('appid', config.weatherApi.key || 'undefined');
  url.searchParams.append('units', 'metric');
  url.searchParams.append('lang', 'es');
  const res = await fetch(url.toString(), {
    next: {
      revalidate: 3600 * 0.5, // 1/2 Hora
      tags: ['weather']
    }
  });
  const data = await res.json();
  return data;
}

export async function getUserCityForecast(
  user: User
): Promise<ForecastResponse> {
  // const url = new URL('https://api.openweathermap.org/data/2.5/forecast');
  const url = new URL(
    'https://pro.openweathermap.org/data/2.5/forecast/hourly'
  );
  url.searchParams.append('lat', user.cityLat.toString());
  url.searchParams.append('lon', user.cityLon.toString());
  url.searchParams.append('appid', config.weatherApi.key || 'undefined');
  url.searchParams.append('cnt', '6');
  url.searchParams.append('mode', 'json');
  url.searchParams.append('units', 'metric');
  url.searchParams.append('lang', 'es');
  const res = await fetch(url.toString(), {
    next: {
      revalidate: 3600 * 0.5, // 1/2 Hora
      tags: ['forecast']
    }
  });
  const data = await res.json();
  return data;
}

export async function userAnswered(user: User): Promise<{
  date: Date;
} | null> {
  const lastReport = await prisma.report.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: new Date(Date.now() - 1000 * 60 * config.form.cooldown)
      }
    },
    select: {
      date: true
    }
  });

  return lastReport;
}

export async function getOutfitByWeather(user: User): Promise<{
  upper: UpperType | null;
  lower: LowerType | null;
}> {
  const clima = await getUserCityWeather(user);

  const tempmin = clima.main.temp_min;
  const tempmax = clima.main.temp_max;
  // const temp = weather.main.temp;

  const reports = await prisma.report.groupBy({
    by: ['lower', 'upper'],
    where: {
      userId: user.id,
      temp: {
        gte: tempmin,
        lte: tempmax
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

  if (!reports.length) {
    // TODO: Reportes de la comunidad
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
