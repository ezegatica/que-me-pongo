import React from 'react';
import { Header, Content, Title } from '@components/headers';
import { getUser, round } from '../../utils';
import { prisma } from '../../db';
import { authOptions } from '../../api/auth/[...nextauth]/route';

export default async function MisRespuestas() {
  const { user } = await getUser(authOptions);
  const respuestas = await prisma.report.findMany({
    where: {
      userId: user.id
    }
  });
  return (
    <div>
      <Header>
        <Title>Mis respuestas</Title>
      </Header>
      <Content>
        {respuestas.map(respuesta => (
          <div className="text-white" key={respuesta.id}>
            <p>
              {respuesta.day} // {respuesta.date.toString()}
            </p>
            <p>Arriba: {respuesta.upper}</p>
            <p>Abajo: {respuesta.lower}</p>
            <p>{round(respuesta.temp)}°C</p>
            <hr />
          </div>
        ))}
      </Content>
    </div>
  );
}
