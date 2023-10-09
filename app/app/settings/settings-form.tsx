'use client';
import { User } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';
import FormButton from '../../(components)/form-button';
import { Toast } from '../../(components)/toast';
import { CityResponse, proxy } from '../../utils';
import { updateUserCity } from './actions';
import CitySearcher from './search-city';

export default function SettingsForm({ user }: { user: User }): JSX.Element {
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: false,
      callbackUrl: '/'
    });
    router.push('/');
    router.refresh();
  }

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
    <div className="divide-y divide-white/5">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <h2
            className="text-base font-semibold leading-7 text-white"
            id="usuario"
          >
            Información personal
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-400">
            Esta información es provista por el proveedor de autenticación
            (Google) y no es modificable.
          </p>
        </div>

        <form className="md:col-span-2">
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
            <div className="col-span-full flex items-center gap-x-8">
              <Image
                src={proxy(user.image || '')}
                width={128}
                height={128}
                alt=""
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Nombre completo
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  value={user.name || ''}
                  readOnly
                  disabled
                  type="text"
                  autoComplete="text"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Dirección de correo
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  value={user.email || ''}
                  readOnly
                  disabled
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </form>
      </div>

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

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-2 sm:px-6 md:grid-cols-4 xl:grid-cols-8 lg:px-8">
        <form
          className="flex items-start md:col-span-2"
          action={async () => {
            await logout();
          }}
        >
          <FormButton variant="danger" type="submit">
            Cerrar sesión en este dispositivo
          </FormButton>
        </form>
      </div>
    </div>
  );
}
