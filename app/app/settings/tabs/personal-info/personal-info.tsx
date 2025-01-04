import { User } from '@prisma/client';
import Image from 'next/image';
import React, { type JSX } from 'react';
import { proxy } from '../../../../utils';

export default function PersonalInfoTab({ user }: { user: User }): JSX.Element {
  return (
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
  );
}
