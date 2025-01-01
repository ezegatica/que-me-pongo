'use client';
import React from 'react';
import { Clothes } from '../../utils';
import FormButton from '@components/form-button';

export default function WeatherFormLoading(): React.ReactNode {
  return (
    <div>
      <div className="space-y-5">
        <div className="border-b border-white/10 pb-6">
          <h2 className="text-base font-semibold leading-7 text-white">
            <span className="block px-8 py-2 bg-gray-800"></span>
          </h2>
          <div className="space-y-10">
            <fieldset>
              <div className="mt-6 space-y-8">
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Upper.shirt.value}
                    value={Clothes.Upper.shirt.value}
                    name={Clothes.Upper.value}
                    type="radio"
                    disabled
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Upper.shirt.value}
                    className="block text-sm font-medium leading-6 text-white bg-gray-800 py-2 px-6"
                  ></label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Upper.hoodie.value}
                    value={Clothes.Upper.hoodie.value}
                    name={Clothes.Upper.value}
                    type="radio"
                    disabled
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Upper.hoodie.value}
                    className="block text-sm font-medium leading-6 text-white bg-gray-800 py-2 px-5"
                  ></label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Upper.jacket.value}
                    value={Clothes.Upper.jacket.value}
                    name={Clothes.Upper.value}
                    type="radio"
                    disabled
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Upper.jacket.value}
                    className="block text-sm font-medium leading-6 text-white bg-gray-800 py-2 px-9"
                  ></label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="border-b border-white/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-white">
            <span className="block px-8 py-2 bg-gray-800"></span>
          </h2>

          <div className="space-y-10">
            <fieldset>
              <div className="mt-6 space-y-8">
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Lower.shorts.value}
                    value={Clothes.Lower.shorts.value}
                    name={Clothes.Lower.value}
                    type="radio"
                    disabled
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Lower.shorts.value}
                    className="block text-sm font-medium leading-6 text-white bg-gray-800 px-5 py-2"
                  ></label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Lower.pants.value}
                    value={Clothes.Lower.pants.value}
                    name={Clothes.Lower.value}
                    type="radio"
                    disabled
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Lower.pants.value}
                    className="block text-sm font-medium leading-6 text-white bg-gray-800 px-12 py-2"
                  ></label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <FormButton disabled variant="primary">
          Guardar
        </FormButton>
      </div>
    </div>
  );
}
