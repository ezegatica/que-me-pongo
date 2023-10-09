import {
  Bars3Icon,
  Cog6ToothIcon,
  EnvelopeIcon,
  MapPinIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import { authOptions } from '../../auth';
import { getUser } from '../../utils';
import FinishOnboarding from './finish-onboarding';
import OnboardingLocation from './onboarding-location';
import { Content, Header, Title } from '@components/headers';

export default async function MisRespuestas(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);

  return (
    <>
      <Header>
        <Title>Configuración inicial</Title>
      </Header>
      <Content>
        <div className="flex-auto font-regular text-white">
          <h3 className="text-base font-semibold leading-6 text-white mb-2 mt-3 text-left">
            Bienvenido a ¿Qué me pongo?
          </h3>
          <p>
            Vamos a terminar de configurar tu cuenta para que tengas la mejor
            experiencia posible en la apicación.
          </p>
          <div className="mt-2 text-gray-400 ml-2">
            <p className="mb-1">
              Primero, vamos a configurar tu ciudad. Esto nos va a permitir
              darte un pronostico del clima mas preciso. <br /> Puedes usar el
              icono de
              <MapPinIcon className="h-5 w-5 text-gray-400 inline" /> para usar
              tu ubicación actual!
            </p>
            <OnboardingLocation user={user} />
            <p className="mt-4">
              Luego, recuerda que puedes acceder al menú de Configuración en
              cualquier momento. Puedes tocar el menu de la izquierda (en web) o
              el icono de <i>hamburguesa</i> (
              <Bars3Icon className="h-5 w-5 inline" /> en móviles) y presionar{' '}
              <Link href="/app/settings">
                <b className="underline">
                  <Cog6ToothIcon className="h-5 w-5 inline" /> Configuración
                </b>
              </Link>
              .
            </p>
            <p className="mt-4">
              Si necesitas mas ayuda, puedes hecharle un vistazo a la sección de{' '}
              <Link href="/app/ayuda">
                <b className="underline">
                  <QuestionMarkCircleIcon className="h-5 w-5 inline" /> Ayuda
                </b>
              </Link>{' '}
              en el menú. <br />
              Si aún así sigues teniendo problemas, puedes contactarnos a través
              de nuestro mail, <EnvelopeIcon className="h-5 w-5 inline" />{' '}
              <a href="mailto:qmp@ezegatica.com" className="underline">
                qmp@ezegatica.com
              </a>
            </p>
            <p className="mt-4">
              Puedes leer nuestra política de privacidad en la siguiente página{' '}
              <a
                href="/legales/privacidad"
                className="underline"
                target="_blank"
              >
                Legales/Política de privacidad
              </a>
            </p>
            <p className="mt-4">
              Si ya terminaste de configurar tu ciudad, clickea en el botón de
              abajo para continuar.
            </p>
            <FinishOnboarding user={user} />
          </div>
        </div>
      </Content>
    </>
  );
}
