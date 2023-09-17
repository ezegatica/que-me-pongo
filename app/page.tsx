import React from 'react';
import { Clothes, round, getBuenosAiresWeather } from './utils';
import Link from 'next/link';

export default async function Landing() {
  const clima = await getBuenosAiresWeather();

  return (
    <div>
      <div className="xl:pl-72">
        <main className="lg:pr-96">
          <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h1 className="text-base font-semibold leading-7 text-white">
              ¿Que me pongo? - Buenos Aires
            </h1>
            <span className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white relative">
              Hacen {round(clima.main.temp)}°C <br />
              Está: {clima.weather[0].description}
            </span>
          </header>
          <hr />
          <h1>Landing</h1>
          <Link href="/app">Entrar a app</Link>
        </main>
      </div>
    </div>
  );
}
