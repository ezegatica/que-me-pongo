import {
  Bars3Icon,
  Cog6ToothIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { type JSX } from 'react';
import FormButton from '../../../(components)/form-button';
import { Content, Header, Title } from '@components/headers';

export default function Onboarding2(): JSX.Element {
  return (
    <>
      <Header>
        <Title>Configuración inicial - Configuración y ayuda</Title>
      </Header>
      <Content>
        <div className="flex-auto font-regular text-white">
          <div className="mt-2 text-gray-300">
            <p className="mt-4">
              Recordpa que puedes acceder al menú de Configuración en cualquier
              momento. Puedes tocar el menu de la izquierda (en web) o el icono
              de <i>hamburguesa</i> (
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
              del email, <EnvelopeIcon className="h-5 w-5 inline" />{' '}
              <a href="mailto:qmp@ezegatica.com" className="underline">
                qmp@ezegatica.com
              </a>
            </p>
          </div>
          <Link href="/app/onboarding/1">
            <FormButton variant="secondary" type="button">
              Pagina anterior &apos;Ubicación&apos;
            </FormButton>
          </Link>
          <Link href="/app/onboarding/3">
            <FormButton variant="primary" type="button">
              Siguiente pagina &apos;Legales y fin&apos;
            </FormButton>
          </Link>
        </div>
      </Content>
    </>
  );
}
