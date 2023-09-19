import React from 'react';
import {
  classNames,
  emojiByWeather,
  getBuenosAiresForecast,
  getBuenosAiresWeather,
  getHour,
  round
} from '../utils';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import RefetcherButton from '../(components)/refetcher-button';

export const revalidate = 1800;
export const dynamic = 'force-static';

export default async function Infobar() {
  const [clima, forecast] = await Promise.all([
    getBuenosAiresWeather(),
    getBuenosAiresForecast()
  ]);

  return (
    <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Clima actual
        </h2>
        <RefetcherButton className="text-sm font-semibold leading-6 text-indigo-400">
          Actualizar
        </RefetcherButton>
      </header>
      <div className="flex-auto truncate font-regular text-white text-center">
        <h2 className="text-xl mb-2">Buenos Aires, AR</h2>
        <h3 className="text-4xl">{round(clima.main.temp)}°C</h3>
        <h4 className="text-2xl" title={clima.weather[0].description}>
          {emojiByWeather(clima.weather[0].icon)}
        </h4>
      </div>
      <div className="px-2">
        <h3 className="text-base font-semibold leading-6 text-white mb-2 mt-3">
          Proximas 6hs
        </h3>
        <dl className="mx-auto grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 gap-3 text-center">
          {forecast.list.map((weather, i) => {
            const lastWeather =
              forecast.list[i - 1]?.main?.temp ?? clima.main.temp;
            const change = round(weather.main.temp - lastWeather);
            return (
              <div
                key={weather.dt}
                className="rounded-lg flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-black/20 px-1 py-6 sm:px-6 xl:px-8 text-white"
              >
                <dt className="text-sm font-medium leading-6  ">
                  {getHour(new Date(weather.dt * 1000))}
                </dt>
                <dd
                  className={classNames(
                    change === 0
                      ? 'text-gray-500'
                      : change > 0
                      ? 'text-green-600'
                      : 'text-red-600',
                    'text-xs font-medium'
                  )}
                >
                  {change === 0 ? (
                    <ArrowRightIcon className="w-5 h-5 inline-block" />
                  ) : change > 0 ? (
                    <ArrowUpIcon className="w-5 h-5 inline-block" />
                  ) : (
                    <ArrowDownIcon className="w-5 h-5 inline-block" />
                  )}
                  {change}°
                </dd>
                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight">
                  {round(weather.main.temp)}°
                </dd>
                <dd className="w-full text-xl font-medium leading-6" title={weather.weather[0].description}>
                  {emojiByWeather(weather.weather[0].icon)}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </aside>
  );
}
