import React from 'react';
import { authOptions } from '../../auth';
import { getUser } from '../../utils';
import SettingsForm from './settings-form';
import { Content, Header, Title } from '@components/headers';

export default async function Configuracion(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);
  return (
    <div>
      <Header>
        <Title>Configuración</Title>
      </Header>
      <Content>
        <SettingsForm user={user} />
      </Content>
    </div>
  );
}
