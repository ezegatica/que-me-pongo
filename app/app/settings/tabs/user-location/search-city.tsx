'use client';
import { Combobox } from '@headlessui/react';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';
import React, { type JSX, startTransition, useEffect, useState } from 'react';
import {
  CityResponse,
  classNames,
  formattedStringByCity
} from '../../../../utils';
import { reverseSearchCityApi, searchCityApi } from '../../actions';

export default function CitySearcher({
  onCitySelected,
  selectedCityStartValue
}: {
  onCitySelected: (city: CityResponse) => void;
  selectedCityStartValue: CityResponse;
}): JSX.Element {
  const comboboxInputRef = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>(
    formattedStringByCity(selectedCityStartValue)
  );
  const [debouncedInputValue, setDebouncedInputValue] = useState<string>(
    formattedStringByCity(selectedCityStartValue)
  );
  const [cities, setCities] = useState<CityResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResponse>(
    selectedCityStartValue
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [inputValue]);

  useEffect(() => {
    const triggerSearchCity = (cityName: string): void => {
      startTransition(async (): Promise<void> => {
        const data = await searchCityApi(cityName);
        setCities(data);
      });
    };

    if (debouncedInputValue) {
      triggerSearchCity(debouncedInputValue);
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    const isSameCityAsStart =
      selectedCity &&
      selectedCityStartValue.lon !== selectedCity.lon &&
      selectedCityStartValue.lat !== selectedCity.lat;
    if (isSameCityAsStart) {
      onCitySelected(selectedCity);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  const handleUseActualLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const { latitude, longitude } = position.coords;
        const city = await reverseSearchCityApi(latitude, longitude);
        setInputValue(formattedStringByCity(city));
        comboboxInputRef.current?.focus();
        setSelectedCity(city);
        onCitySelected(city);
      },
      error => {
        console.error(error);
      }
    );
  };

  return (
    <Combobox as="div" value={selectedCity} onChange={setSelectedCity}>
      <div className="relative mt-2">
        <Combobox.Input
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          ref={comboboxInputRef}
          onChange={handleInputChange}
          id="citySearch"
          displayValue={(city: CityResponse) =>
            city ? formattedStringByCity(city) : ''
          }
        />
        <Combobox.Button className="absolute inset-y-0 right-10 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MapPinIcon
            onClick={handleUseActualLocation}
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {cities.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {cities.map(city => (
              <Combobox.Option
                key={`${city.lat}-${city.lon}-${city.name}-${city.country}`}
                value={city}
                onChange={e => {
                  Promise.resolve(e);
                }}
                disabled={city === selectedCity}
                className={({ focus }) =>
                  classNames(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    focus ? 'bg-indigo-600 text-gray-200' : 'text-white'
                  )
                }
              >
                {({ focus, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected ? 'font-semibold' : ''
                      )}
                    >
                      {formattedStringByCity(city)}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          focus ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
