'use client';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { User } from '@prisma/client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function OnboarderBanner({ user }: { user: User }): JSX.Element {
  const pathname = usePathname();
  return (
    <>
      {!user.onboarded && !pathname.startsWith('/app/onboarding') && (
        <div className="absolute items-center top-1 z-50 mx-auto rounded-md bg-blue-50 left-10 right-10 sm:right-20 sm:left-20 m-auto ">
          <div className="flex p-4">
            <div className="flex-shrink-0">
              <InformationCircleIcon
                className="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">
                ¡Bienvenido! Vamos a terminar de configurar tu cuenta para que
                tengas una mejor experiencia.
              </p>
              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <Link
                  href="/app/onboarding"
                  className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600"
                >
                  Completar
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
