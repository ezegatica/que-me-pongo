import Link from 'next/link';
import React, { type JSX } from 'react';
import FormButton from '../../../(components)/form-button';
import { authOptions } from '../../../auth';
import { getUser } from '../../../utils';
import FinishOnboarding from '../finish-onboarding';
import { Content, Header, Title } from '@components/headers';

export default async function Onboarding3(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);

  return (
    <>
      <Header>
        <Title>Configuración inicial - Legales y fin</Title>
      </Header>
      <Content>
        <div className="flex-auto font-regular text-white">
          <div className="mt-2 text-gray-300">
            <p className="mt-4">
              Por ultimo, recordá que podés leer nuestra política de privacidad
              en la siguiente página{' '}
              <a
                href="/legales/privacidad"
                className="underline"
                target="_blank"
              >
                Legales/Política de privacidad
              </a>{' '}
              para ver como como manejamos tus datos. Quedate tranquilo/a que{' '}
              <b>
                no compartimos nada con nadie ni vendemos tu información a
                ningun tercero
              </b>
              , solo recopilamos que usted nos provea y solo lo que necesitamos
              para que la app funcione.
            </p>
            <p className="mt-4">
              Si ya terminaste de leer todo, clickea en el botón azul de abajo
              para terminar con el Onboarding y desbloquear el resto de la
              aplicación.
            </p>
            <Link href="/app/onboarding/1">
              <FormButton variant="secondary" type="button">
                Pagina anterior &apos;Configuración y ayuda&apos;
              </FormButton>
            </Link>
            <FinishOnboarding user={user} />
          </div>
        </div>
      </Content>
    </>
  );
}
