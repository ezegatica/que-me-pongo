'use client';
import { InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { type JSX, useState } from 'react';
import { ForecastResponse, WeatherResponse } from '../utils';

export default function WeatherAlerts({
  clima,
  pronostico
}: {
  clima: WeatherResponse;
  pronostico: ForecastResponse;
}): JSX.Element {
  const rainingStatuses = ['Rain', 'Thunderstorm', 'Drizzle'];
  const isRaining =
    rainingStatuses.includes(clima.weather[0].main) && pronostico.cnt > 0; // Este ultimo es para que no tire error de variable inútil

  return <>{isRaining && <RainAlert />}</>;
}

const RainAlert = (): JSX.Element => {
  const [show, setShow] = useState(true);
  if (!show) return <></>;
  return (
    <div className="rounded-md bg-blue-100 p-4 mb-2">
      <div className="flex">
        <div className="flex-shrink-0">
          <InformationCircleIcon
            className="h-5 w-5 text-blue-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-blue-700">
            Considerá que está actualmente lloviendo. Salí con un paraguas o un
            piloto.
          </p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              onClick={() => setShow(false)}
              className="inline-flex rounded-md bg-blue-100 p-1.5 text-blue-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-blue-50"
            >
              <span className="sr-only">Ignorar</span>
              <XMarkIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
