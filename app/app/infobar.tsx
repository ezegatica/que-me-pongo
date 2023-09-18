import React from 'react';
import { emojiByWeather, getBuenosAiresWeather, round } from '../utils';

export const revalidate = 1800;

export default async function Infobar() {
  const clima = await getBuenosAiresWeather();
  return (
    <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Clima actual
        </h2>
        <button className="text-sm font-semibold leading-6 text-indigo-400">
          Ver pronostico
        </button>
      </header>
      <div className="flex-auto truncate font-regular text-white text-center">
        <h3 className="text-4xl">{round(clima.main.temp)}°C</h3>
        <h4 className="text-2xl" title={clima.weather[0].description}>
          {emojiByWeather(clima.weather[0].icon)}
        </h4>
      </div>
    </aside>
  );
}
