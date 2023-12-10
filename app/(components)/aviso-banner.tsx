'use client';
import {
  ExclamationTriangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import React from 'react';

export default function AvisoBanner({ aviso }: { aviso: string }): JSX.Element {
  const [hideAviso, setHideAviso] = React.useState(true);

  React.useEffect(() => {
    const hideAvisoStg = localStorage.getItem('hideAviso');
    if (hideAvisoStg === 'false') {
      setHideAviso(false);
    }
  }, []);

  React.useEffect(() => {
    const lastAviso = localStorage.getItem('lastAviso');
    if (lastAviso && lastAviso !== aviso) {
      console.info('Actualizando referencia al Aviso');
      setHideAviso(false);
      localStorage.setItem('hideAviso', 'false');
      localStorage.setItem('lastAviso', aviso);
    }
  }, [hideAviso, aviso]);

  function hideAvisoHandler(): void {
    setHideAviso(true);
    localStorage.setItem('hideAviso', 'true');
    localStorage.setItem('lastAviso', aviso);
  }

  return (
    <>
      {aviso && !hideAviso && (
        <div className="absolute items-center bottom-1 z-50 mx-auto rounded-md left-5 right-5 sm:right-28 sm:left-28 md:left-48 md:right-48 lg:right-96 lg:left-96 m-auto border-l-4 border-yellow-400 bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-6 w-6 text-yellow-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <p className="text-md text-yellow-700">
                <span className="font-medium text-yellow-700 underline mr-2">
                  Aviso!
                </span>
                {aviso.toString()}
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  type="button"
                  onClick={() => hideAvisoHandler()}
                  className="inline-flex rounded-md bg-yellow-50 p-1.5 text-yellow-500 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-2 focus:ring-offset-yellow-50"
                >
                  <span className="sr-only">Cerrar</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
