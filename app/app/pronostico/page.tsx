import {
  ArrowRightIcon,
  ArrowTrendingDownIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import { authOptions } from '../../auth';
import {
  classNames,
  emojiByWeather,
  getBuenosAiresForecast,
  getBuenosAiresWeather,
  getHour,
  getUser,
  round
} from '../../utils';
import { Content, Header, Title } from '@components/headers';

export default async function Pronostico(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);
  const [clima, forecast] = await Promise.all([
    getBuenosAiresWeather(),
    getBuenosAiresForecast(),
    Promise.resolve(user) // Para que no joda el linter
  ]);
  return (
    <div>
      <Header>
        <Title>Pronostico de las proximas 6hs</Title>
      </Header>
      <Content>
        <header>
          <div className="flex-auto truncate font-regular text-white text-center">
            <h3 className="text-base font-semibold leading-6 text-white mb-2 mt-3 text-left">
              Clima actual
            </h3>
            <h2 className="text-xl mb-2">Buenos Aires, AR</h2>
            <h3 className="text-4xl" title={`${clima.main.temp.toString()}°C`}>
              {round(clima.main.temp)}°C
            </h3>
            <h4 className="text-2xl" title={clima.weather[0].description}>
              {emojiByWeather(clima.weather[0].icon)}
            </h4>
          </div>
        </header>
        <div className="px-2">
          <h3 className="text-base font-semibold leading-6 text-white mb-2 mt-3">
            Proximas 6hs
          </h3>
          <dl className="mx-auto grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-6 gap-1.5 text-center">
            {forecast.list.map((weather, i) => {
              const lastWeather =
                forecast.list[i - 1]?.main?.temp ?? clima.main.temp;
              const change = round(weather.main.temp) - round(lastWeather);
              return (
                <div
                  key={weather.dt}
                  className="rounded-lg flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-black/20 px-1 py-2 pb-4 sm:px-6 xl:px-8 text-white"
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
                    title={`${lastWeather.toString()}°C`}
                  >
                    {change === 0 ? (
                      <ArrowRightIcon className="w-5 h-5 inline-block mr-1" />
                    ) : change > 0 ? (
                      <ArrowTrendingUpIcon className="w-5 h-5 inline-block" />
                    ) : (
                      <ArrowTrendingDownIcon className="w-5 h-5 inline-block" />
                    )}
                    {change}
                    {change !== 0 && '°'}
                  </dd>
                  <dd
                    className="w-full flex-none text-3xl font-medium leading-10 tracking-tight"
                    title={`${weather.main.temp.toString()}°C`}
                  >
                    {round(weather.main.temp)}°
                  </dd>
                  <dd
                    className="w-full text-xl font-medium leading-6"
                    title={weather.weather[0].description}
                  >
                    {emojiByWeather(weather.weather[0].icon)}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Content>
    </div>
  );
}
