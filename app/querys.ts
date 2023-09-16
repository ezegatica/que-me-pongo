import { WeatherResponse, config } from "./utils";

export async function getBuenosAiresWeather(): Promise<WeatherResponse> {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=-34.6075682&lon=-58.4370894&appid=${config.weatherApi.key}&units=metric&lang=es`,
      {
        next: {
          revalidate: 3600 * 0.5, // 1/2 Hora
          tags: ["weather"],
        }
      }
    )
    const data = await res.json();
    return data;
  }