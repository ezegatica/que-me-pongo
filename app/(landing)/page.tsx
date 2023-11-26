import {
  DevicePhoneMobileIcon,
  MoonIcon,
  PaperAirplaneIcon,
  RocketLaunchIcon,
  ShoppingBagIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import packagejson from '@/package.json';

export const dynamic = 'force-static';

const features = [
  {
    name: '¡Desde donde quieras!',
    description:
      'Te fuiste de vacaciones y queres registrar tus prendas? No hay problema, podes cambiar la ciudad en la que estas y seguir registrando con la temperatura de donde estes!.',
    icon: PaperAirplaneIcon
  },
  {
    name: '¿Salis por todo el día?',
    description:
      'Si vas a salir por unas cuantas horas, podes marcar el rango horario y recibir la recomendación tomando en cuenta los minimos y maximos de tu salida.',
    icon: MoonIcon
  },
  {
    name: '¿Te vas de viaje?',
    comingSoon: true,
    description:
      'Si vas a viajar a otra ciudad, vas a poder pronosticar el clima de los proximos días y ver que te conviene llevar. Así te evitas sorpresas al llegar a tu destino.',
    icon: ShoppingBagIcon
  },
  {
    name: '¡Llevala a donde quieras!',
    description:
      'Instalando la aplicación para móviles, cargá tus prendas desde donde estes y recibí recomendaciones en base a la temperatura actual desde donde sea que estés.',
    icon: DevicePhoneMobileIcon
  }
];

export default function LandingPage(): JSX.Element {
  return (
    <div className="bg-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">¿Qué me pongo?</span>
              <Image
                width={64}
                height={64}
                className="h-8 w-auto"
                src="/qmp.png"
                alt="QMP Logo"
              />
            </Link>
          </div>
          <div className="lg:flex lg:flex-1 lg:justify-end space-x-4">
            <Link
              href="/legales/privacidad"
              className="text-sm font-semibold leading-6 text-gray-500"
            >
              Politica de privacidad
            </Link>
            <Link
              href="/auth/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Iniciar sesión <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative flex rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Versión {packagejson.version}{' '}
              <RocketLaunchIcon className="h-4 w-4 ml-2 mt-0.5" />
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              ¿Qué me pongo?
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Una aplicación para ayudarte a elegir que ponerte en base al clima
              y a tus preferencias pasadas. ¡No más perder tiempo!
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/app"
                className="rounded-lg bg-indigo-600 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Entrar a la app
              </Link>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)'
            }}
          />
        </div>
      </div>

      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2
              className="text-base font-semibold leading-7 text-indigo-600"
              id="features"
            >
              Salí con la ropa adecuada
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              ¿Cansado de no saber si hace o mucho calor o mucho frío?
            </p>
            <div className="text-lg leading-8 text-gray-600">
              <p className="mt-6 ">
                Esta aplicación te permite registrar que prendas te pones dada
                la temperatura que hace actualmente, para que la proxima vez que
                haga una temperatura similar, puedas ver que te pusiste las
                últimas veces.
              </p>
              <p>
                Cada persona es diferente, si soles ser mas fríolento o caluroso
                el algoritmo se va a ir ajustando a tus preferencias.
              </p>
            </div>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
              {features.map(feature => (
                <div key={feature.name} className="relative pl-16">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                      <feature.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    {feature.name}
                    {feature?.comingSoon && (
                      <span className="ml-2 inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        ¡Pronto!
                      </span>
                    )}
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-600">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
