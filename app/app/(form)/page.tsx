import React from 'react';
import { getBuenosAiresWeather } from '../../querys';
import { emojiByWeather, round } from '../../utils';
import WeatherForm from './form';

export default async function FormPage() {
  const clima = await getBuenosAiresWeather();

  return (
    <div>
      <div className="xl:pl-72">
        <main className="lg:pr-96">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-white">
              ¿Que me pongo? - Buenos Aires
            </h1>
            <span title={clima.weather[0].description} className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white relative">
              Hacen {round(clima.main.temp)}°C {emojiByWeather(clima.weather[0].icon)}
            </span>
          </header>
          {/* form de data */}
         <WeatherForm />
        </main>
      </div>
    </div>
  );
}
