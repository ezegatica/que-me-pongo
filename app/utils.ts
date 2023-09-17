import { NextAuthOptions, getServerSession } from 'next-auth';
import { prisma } from './db';
import { User } from '@prisma/client';

export function round(temp: number) {
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
  }
};

export const Clothes = {
  Upper: {
    value: 'upper',
    Shirt: {
      value: 'shirt',
      displayName: 'Remerita'
    },
    Hoodie: { value: 'hoodie', displayName: 'Remerita + Bucito' },
    Jacket: { value: 'jacket', displayName: 'Remerita + Bucito + Campera' }
  },
  Lower: {
    value: 'lower',
    Shorts: { value: 'shorts', displayName: 'Shorts' },
    Pants: { value: 'pants', displayName: 'Pantalon Largo' }
  }
};

export function emojiByWeather(icon: string) {
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
    '02n': '🌑 🌤️',
    '03n': '🌑 ⛅',
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

export const getUser = async (authOptions: NextAuthOptions) => {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string
    },
    include: {
      Reports: true
    }
  });

  if (!user) {
    throw new Error("User doesn't exist in database");
  }

  return { user, session };
};

export async function getBuenosAiresWeather(): Promise<WeatherResponse> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=-34.6075682&lon=-58.4370894&appid=${config.weatherApi.key}&units=metric&lang=es`,
    {
      next: {
        revalidate: 3600 * 0.5, // 1/2 Hora
        tags: ['weather']
      }
    }
  );
  const data = await res.json();
  return data;
}

export async function getOutfitByWeather(user: User, weather: WeatherResponse) {
  const tempmin = weather.main.temp_min;
  const tempmax = weather.main.temp_max;
  const temp = weather.main.temp;

  console.log({ tempmin, tempmax, temp });
  const reports = await prisma.report.findMany({
    where: {
      userId: user.id,
      temp: {
        gte: tempmin,
        lte: tempmax
      }
    }
  });
  const lowerCount = new Map<string, number>();
  const upperCount = new Map<string, number>();

  reports.forEach((report) => {
    const lower = report.lower;
    const upper = report.upper;

    if (lowerCount.has(lower)) {
      lowerCount.set(lower, lowerCount.get(lower)! + 1);
    } else {
      lowerCount.set(lower, 1);
    }

    if (upperCount.has(upper)) {
      upperCount.set(upper, upperCount.get(upper)! + 1);
    } else {
      upperCount.set(upper, 1);
    }
  })

  const lower = [...lowerCount.entries()].sort((a, b) => b[1] - a[1])[0][0];
  const upper = [...upperCount.entries()].sort((a, b) => b[1] - a[1])[0][0];

  return {
    lower,
    upper
  };
}

export interface WeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
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
