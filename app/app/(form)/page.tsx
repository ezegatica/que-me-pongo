import React from 'react';
import WeatherForm from './form';
import { Content, Header, Title } from '@components/headers';

export default async function FormPage() {

  return (
    <div>
      <Header>
        <Title>¿Que me pongo? - Buenos Aires</Title>
      </Header>
      <Content>
        <WeatherForm />
      </Content>
    </div>
  );
}
