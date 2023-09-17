'use client';
import React, { useRef } from 'react';
import { Clothes, WeatherResponse } from '../../utils';
import { Submit } from './actions';
import { useSession } from 'next-auth/react';
import FormButton from '@components/form-button';
import { Toast } from '@components/toast';

export default function WeatherForm({ clima }: { clima: WeatherResponse }) {
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="pl-12 pl-12 pt-8 pb-8"
      action={async e => {
        await Submit(e, session, clima);
        Toast.fire({ title: 'Outfit registrado con éxito', icon: 'success' });
        formRef.current?.reset();
      }}
    >
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
        <FormButton variant="secondary" type="reset">
          Reiniciar
        </FormButton>
        <FormButton variant="primary" type="submit">
          Guardar
        </FormButton>
      </div>
    </form>
  );
}
