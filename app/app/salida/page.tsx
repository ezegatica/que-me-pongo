import React from 'react';
import SalidaForm from './form';
import { Content, Header, Title } from '@components/headers';

export default async function Pronostico(): Promise<JSX.Element> {
  await Promise.resolve();
  return (
    <div>
      <Header>
        <Title>Planificar salida</Title>
      </Header>
      <Content>
        <SalidaForm />
      </Content>
    </div>
  );
}
