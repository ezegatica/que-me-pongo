import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { type JSX } from 'react';
import { Toast } from '../../../../(components)/toast';
import { CityResponse } from '../../../../utils';
import { updateUserCity } from '../../actions';
import CitySearcher from './search-city';

export default function UserLocationTab({ user }: { user: User }): JSX.Element {
  const router = useRouter();

  async function updateUserCityHandler(city: CityResponse) {
    await updateUserCity(city);
    Toast.fire({
      title: '¡Ubicación actualizada!',
      icon: 'success',
      text: `Ahora te encuentras en: ${city.name}, ${city.country}`,
      timer: 5000
    });
    router.refresh();
  }
  return (
    <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2
          className="text-base font-semibold leading-7 text-white"
          id="ubicacion"
        >
          Ubicación
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          Modifica tu ubicación para que podamos mostrarte los resultados más
          relevantes.
        </p>
      </div>

      <form className="md:col-span-2">
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
          <div className="col-span-full">
            <label
              htmlFor="citySearch"
              className="block text-sm font-medium leading-6 text-white"
            >
              Ciudad, provincia/estado, país
            </label>
            <div className="mt-2">
              <CitySearcher
                onCitySelected={updateUserCityHandler}
                selectedCityStartValue={{
                  lat: user.cityLat,
                  lon: user.cityLon,
                  name: user.cityName,
                  country: user.cityCountry
                }}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
