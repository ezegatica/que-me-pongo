'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import FormButton from '../../(components)/form-button';
import { Content, Header, Title } from '@components/headers';

export default function Onboarding(): JSX.Element {
  const router = useRouter();

  const navigateToNextPage = () => {
    router.push('/app/onboarding/1');
  };

  return (
    <>
      <Header>
        <Title>Configuración inicial</Title>
      </Header>
      <Content>
        <form action={navigateToNextPage}>
          <div className="flex-auto font-regular text-white">
            <h3 className="text-lg font-semibold leading-6 text-white mb-4 mt-3 text-left">
              Bienvenido a ¿Qué me pongo?
            </h3>
            <div className="mb-2">
              <p>
                Vamos a hacer algunas preguntas para terminar de configurar tu
                cuenta.
              </p>
              <p>
                Esto nos permitirá personalizar tu experiencia y asegurarnos de
                que aprovechas al máximo todas las funcionalidades de la
                aplicación.
              </p>
            </div>
            <FormButton variant="primary" type="submit">
              Siguiente pagina &apos;Ubicación&apos;
            </FormButton>
          </div>
        </form>
      </Content>
    </>
  );
}
