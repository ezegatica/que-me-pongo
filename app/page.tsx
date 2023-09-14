import React from 'react';
import { getBuenosAiresWeather } from './querys';
import { round } from './utils';

export default async function Example() {
  const clima = await getBuenosAiresWeather();

  console.log({ clima });

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
          {/* form de data */}
          <form className="pl-12 pl-12 pt-8 pb-8">
            <div className="space-y-5">
              <div className="border-b border-white/10 pb-6">
                <h2 className="text-base font-semibold leading-7 text-white">
                  Parte de arriba
                </h2>
                <div className="space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Remerita
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Remerita + Bucito
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor="push-nothing"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Remerita + Bucito + Campera
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div className="border-b border-white/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-white">
                  Parte de abajo
                </h2>

                <div className="space-y-10">
                  <fieldset>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-everything"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor="push-everything"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Shorcito
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-email"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor="push-email"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Pantalon largo
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="push-nothing"
                          name="push-notifications"
                          type="radio"
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor="push-nothing"
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          Nada 😳
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-white"
              >
                Reiniciar
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
