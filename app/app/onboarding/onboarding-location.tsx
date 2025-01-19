'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { type JSX } from 'react';
import { Toast } from '../../(components)/toast';
import { CityResponse } from '../../utils';
import { updateUserCity } from '../settings/actions';
import CitySearcher from '../settings/tabs/user-location/search-city';

export default function OnboardingLocation({
  user
}: {
  user: User;
}): JSX.Element {
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
    <form className="md:col-span-2">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full">
          <label
            htmlFor="citySearch"
            className="block text-sm font-medium leading-6 text-white"
          >
            Ciudad, provincia/estado, país
          </label>
          <div className="mt-2 z-50">
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
  );
}
