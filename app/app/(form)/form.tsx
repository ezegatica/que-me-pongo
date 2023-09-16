"use client";
import React from 'react'
import { Clothes } from '../../utils';
import { useSession } from 'next-auth/react';
import { Submit } from './actions';

export default function WeatherForm() { 
    const { data: session } = useSession();

  return (
     <form className="pl-12 pl-12 pt-8 pb-8" action={(e) => Submit(e, session)}>
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
                          id={Clothes.Upper.Shirt.value}
                          value={Clothes.Upper.Shirt.value}
                          name={Clothes.Upper.value}
                          type="radio"
                          required
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor={Clothes.Upper.Shirt.value}
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          {Clothes.Upper.Shirt.displayName}
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id={Clothes.Upper.Hoodie.value}
                          value={Clothes.Upper.Hoodie.value}
                          name={Clothes.Upper.value}
                          type="radio"
                          required
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor={Clothes.Upper.Hoodie.value}
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          {Clothes.Upper.Hoodie.displayName}
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id={Clothes.Upper.Jacket.value}
                          value={Clothes.Upper.Jacket.value}
                          name={Clothes.Upper.value}
                          type="radio"
                          required
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor={Clothes.Upper.Jacket.value}
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          {Clothes.Upper.Jacket.displayName}
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
                          id={Clothes.Lower.Shorts.value}
                          value={Clothes.Lower.Shorts.value}
                          name={Clothes.Lower.value}
                          type="radio"
                          required
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor={Clothes.Lower.Shorts.value}
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          {Clothes.Lower.Shorts.displayName}
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id={Clothes.Lower.Pants.value}
                          value={Clothes.Lower.Pants.value}
                          name={Clothes.Lower.value}
                          type="radio"
                          required
                          className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                        />
                        <label
                          htmlFor={Clothes.Lower.Pants.value}
                          className="block text-sm font-medium leading-6 text-white"
                        >
                          {Clothes.Lower.Pants.displayName}
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
  )
}
