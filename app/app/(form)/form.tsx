'use client';
import { Report } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React, { type JSX, useMemo, useRef, useState } from 'react';
import { Clothes, Outfit } from '../../utils';
import { Edit, Submit } from './actions';
import FormButton from '@components/form-button';
import { Toast } from '@components/toast';

export default function WeatherForm({
  report = undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onSubmit = () => {}
}: {
  report?: Report;
  onSubmit?: () => void;
}): JSX.Element {
  const defaultFormData = useMemo(
    () =>
      (report
        ? {
            lower: report.lower.toString(),
            upper: report.upper.toString()
          }
        : {
            lower: null,
            upper: null
          }) as Outfit,
    [report]
  );
  const [formData, setFormData] = useState<Outfit>(defaultFormData);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      ref={formRef}
      action={async () => {
        try {
          if (!report) {
            await Submit(formData);
            Toast.fire({
              title: 'Outfit registrado con éxito',
              icon: 'success'
            });
            router.push('/app/ask');
          } else {
            if (
              report.lower === formData.lower &&
              report.upper === formData.upper
            ) {
              Toast.fire({
                title: 'No hay cambios. Cerrando edición.',
                icon: 'info'
              });
            } else {
              await Edit(formData, report.id);
              Toast.fire({
                title: 'Respuesta editada con éxito',
                icon: 'success'
              });
            }
            onSubmit();
          }
          router.refresh();
        } catch (error: any) {
          Toast.fire({
            title: error?.message || 'Error desconocido',
            icon: 'error'
          });
        } finally {
          setFormData({
            lower: null,
            upper: null
          });
        }
      }}
      onReset={() => setFormData(defaultFormData)}
    >
      <h2 className="text-lg font-semibold leading-7 text-white mb-2">
        ¿Qué llevas puesto ahora?
      </h2>
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
                    defaultChecked={
                      formData.upper === Clothes.Upper.shirt.value
                    }
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    defaultChecked={
                      formData.upper === Clothes.Upper.hoodie.value
                    }
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
                    onChange={handleInputChange}
                    defaultChecked={
                      formData.upper === Clothes.Upper.jacket.value
                    }
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
                    onChange={handleInputChange}
                    defaultChecked={
                      formData.lower === Clothes.Lower.shorts.value
                    }
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
                    onChange={handleInputChange}
                    defaultChecked={
                      formData.lower === Clothes.Lower.pants.value
                    }
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

      <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-1 sm:gap-3">
        <FormButton variant="primary" type="submit">
          Enviar
        </FormButton>
      </div>
    </form>
  );
}
