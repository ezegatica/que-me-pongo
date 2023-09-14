import { WeatherResponse } from "./utils";

export async function getBuenosAiresWeather(): Promise<WeatherResponse> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=-34.6075682&lon=-58.4370894&appid=${process.env.WEATHER_API_KEY}&units=metric&lang=es`
    )
    const data = await res.json();
    return data;
  }