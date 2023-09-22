'use client';
import { Combobox } from '@headlessui/react';
import { CheckIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import React, { startTransition, useEffect, useState } from 'react';
import { CityResponse, classNames, formattedStringByCity } from '../../utils';
import { searchCityApi } from './actions';

export default function CitySearcher({
  onCitySelected,
  selectedCityStartValue
}: {
  onCitySelected: (city: CityResponse) => void;
  selectedCityStartValue: CityResponse;
}): JSX.Element {
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
      // @ts-expect-error  Type 'Promise<void>' is not assignable to type 'VoidOrUndefinedOnly'.ts(2345)
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
    if (selectedCity) {
      onCitySelected(selectedCity);
    }
  }, [onCitySelected, selectedCity]);

  return (
    <Combobox as="div" value={selectedCity} onChange={setSelectedCity}>
      <div className="relative mt-2">
        <Combobox.Input
          className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
          onChange={handleInputChange}
          displayValue={(city: CityResponse) =>
            city ? `${city.name}, ${city.country}` : ''
          }
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {cities.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white/5 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {cities.map(city => (
              <Combobox.Option
                key={`${city.lat}-${city.lon}-${city.name}-${city.country}`}
                value={city}
                onChange={e => {
                  Promise.resolve(e);
                }}
                disabled={city === selectedCity}
                className={({ active }) =>
                  classNames(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-gray-200' : 'text-white'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        'block truncate',
                        selected ? 'font-semibold' : ''
                      )}
                    >
                      {city.name}, {city.country}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
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
