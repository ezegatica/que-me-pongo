import { MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React from 'react';
import FormButton from '../../../(components)/form-button';
import { authOptions } from '../../../auth';
import { getUser } from '../../../utils';
import OnboardingLocation from './../onboarding-location';
import { Content, Header, Title } from '@components/headers';

export default async function Onboarding1(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);

  return (
    <>
      <Header>
        <Title>Configuración inicial - Ubicación</Title>
      </Header>
      <Content>
        <div className="flex-auto font-regular text-white">
          <div className="mt-2 text-gray-300">
            <p className="mb-1">
              Primero, vamos a configurar tu ciudad actual. Esto nos va a
              permitir darte un pronostico del clima mas preciso. <br /> Puedes
              usar el icono de
              <MapPinIcon className="h-5 w-5 text-gray-400 inline ml-1" /> para
              usar tu ubicación actual!
            </p>
            <OnboardingLocation user={user} />
          </div>
          <Link href="/app/onboarding">
            <FormButton variant="secondary" type="button">
              Pagina anterior
            </FormButton>
          </Link>
          <Link href="/app/onboarding/2">
            <FormButton variant="primary" type="button">
              Siguiente pagina &apos;Configuracion y ayuda&apos;
            </FormButton>
          </Link>
        </div>
      </Content>
    </>
  );
}
