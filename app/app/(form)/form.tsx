'use client';
import React, { useRef } from 'react';
import { Clothes } from '../../utils';
import { Submit } from './actions';
import { useSession } from 'next-auth/react';
import FormButton from '@components/form-button';
import { Toast } from '@components/toast';
import { useRouter } from 'next/navigation';

export default function WeatherForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      action={async e => {
        await Submit(e, session);
        Toast.fire({ title: 'Outfit registrado con éxito', icon: 'success' });
        formRef.current?.reset();
        router.refresh();
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
                    id={Clothes.Upper.shirt.value}
                    value={Clothes.Upper.shirt.value}
                    name={Clothes.Upper.value}
                    type="radio"
                    required
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Upper.shirt.value}
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    {Clothes.Upper.shirt.displayName}
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Upper.hoodie.value}
                    value={Clothes.Upper.hoodie.value}
                    name={Clothes.Upper.value}
                    type="radio"
                    required
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Upper.hoodie.value}
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    {Clothes.Upper.hoodie.displayName}
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Upper.jacket.value}
                    value={Clothes.Upper.jacket.value}
                    name={Clothes.Upper.value}
                    type="radio"
                    required
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Upper.jacket.value}
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    {Clothes.Upper.jacket.displayName}
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
                    id={Clothes.Lower.shorts.value}
                    value={Clothes.Lower.shorts.value}
                    name={Clothes.Lower.value}
                    type="radio"
                    required
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Lower.shorts.value}
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    {Clothes.Lower.shorts.displayName}
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id={Clothes.Lower.pants.value}
                    value={Clothes.Lower.pants.value}
                    name={Clothes.Lower.value}
                    type="radio"
                    required
                    className="h-4 w-4 border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-600 focus:ring-offset-gray-900"
                  />
                  <label
                    htmlFor={Clothes.Lower.pants.value}
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    {Clothes.Lower.pants.displayName}
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
