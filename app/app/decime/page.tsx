import React from 'react';
import { Header, Title } from '@components/headers';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { getUser, round } from '../../utils';

export default async function MisRespuestas() {
  const { user } = await getUser(authOptions);

  return (
    <div>
      <Header>
        <Title>Mis respuestas</Title>
      </Header>
      {user.Reports.map(respuesta => (
        <div className="text-white">
          <p>{respuesta.day} // {respuesta.date.toString()}</p>
          <p>Arriba: {respuesta.upper}</p>
          <p>Abajo: {respuesta.lower}</p>
          <p>{round(respuesta.temp)}°C</p>
          <hr />
        </div>
      ))}
    </div>
  );
}
