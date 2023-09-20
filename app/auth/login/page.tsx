import Image from 'next/image';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from '../../auth';
import LoginForm from './form';

export default async function LoginPage(): Promise<JSX.Element> {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/app');
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto h-24 w-auto"
            width={256}
            height={256}
            src="/qmp.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            ¿Qué me pongo?
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 pb-6 pt-2 shadow sm:rounded-lg sm:px-12">
            <div>
              <div className="relative mt-10">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">
                    Iniciar sesión con
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
