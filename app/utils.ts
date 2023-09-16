import { randomBytes } from "crypto";

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
