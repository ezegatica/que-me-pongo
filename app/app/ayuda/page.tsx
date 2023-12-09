import Link from 'next/link';
import React from 'react';
import { classNames } from '../../utils';
import { Content, Header, Title } from '@components/headers';

const actions = [
  {
    title: '¿Como instalo la aplicación para celulares?',
    href: '/instalacion.mp4',
    description:
      'Para instalar la aplicación para celulares puedes seguir el instructivo en cliqueando aquí.',
    action:
      'Sino, puedes dirigirte a Configuración del sitio > Instalar "¿Que me pongo?"'
  },
  {
    title: '¿Como registro una prenda?',
    href: '/app',
    description:
      'Para registrar la ropa que te pusiste, debes ir al formulario de registro de prendas.',
    action: 'Puedes hacerlo yendo a Menu > Registro'
  },
  {
    title: 'Registré las prendas equivocadas',
    href: '/app/respuestas',
    description:
      '¿Saliste y te diste cuenta que hacía mas frío o más calor? No pasa nada, podes cambiar o hasta eliminar la respuesta que habias declarado.',
    action:
      'Puedes hacerlo yendo a Menu > Mis Respuestas y toca en el boton de "Editar"'
  },
  {
    title: 'Quiero cambiar la ciudad en la que estoy',
    href: '/app/settings#ubicacion',
    description:
      '¿Te fuiste de viaje a otra ciudad y queres seguir usando la aplicación? ¿Estás en otro lado de tu habitual? No pasa nada, podes cambiar tu ubicacion para recibir el pronostico de donde sea que estés!',
    action:
      'Puedes hacerlo yendo a Menu > Configuración y bajando hasta "Ubicación"'
  },
  {
    title:
      'Voy a salir por algunas horas, ¿Como hago para saber que ropa llevar?',
    href: '/app/salida',
    description:
      'Si tenes planeado salir por algunas horas, puede ser que la temperatura cambie y debas llevar algo más. Puedes usar la funcionalidad de "Planificar salida" para recibir recomendaciones dado un rango de horas.',
    action: 'Puedes hacerlo yendo a Menu > Planificar salida'
  },
  {
    title: 'Tengo problemas al encontrar mi ciudad',
    href: '/app/settings#ubicacion',
    description:
      'En caso de que no encuentres tu ciudad en la pestaña de Ubicación, puedes elegir una ciudad mas cercana para recibir el pronostico y las recomendaciones lo mas acertado posible.'
  }
];

export default function MisRespuestas(): JSX.Element {
  return (
    <>
      <Header>
        <Title>Ayuda - Preguntas frecuentes</Title>
      </Header>
      <Content>
        <div className="overflow-hidden rounded-lg shadow grid grid-cols-1 gap-px divide-y-0 gap-y-2">
          {actions.map((item, itemIdx) => (
            <div
              key={item.title}
              className={classNames(
                itemIdx === 0 ? 'rounded-t-lg rounded-tl-lg rounded-tr-lg' : '',
                itemIdx === actions.length - 1
                  ? 'rounded-b-lg rounded-bl-lg rounded-br-lg'
                  : '',
                'group relative bg-black/20 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-full'
              )}
            >
              <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-white">
                  <Link
                    href={item.href}
                    className="focus:outline-none"
                    scroll={false}
                  >
                    <span className="absolute inset-0" aria-hidden="true" />
                    {item.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                <p className="mt-0.5 text-sm font-bold text-gray-400">
                  {item.action}
                </p>
              </div>
              <span
                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-600"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
}
