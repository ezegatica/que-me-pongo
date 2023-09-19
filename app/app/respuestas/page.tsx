'use server';

import React from 'react';
import { authOptions } from '../../auth';
import { prisma } from '../../db';
import { getUser } from '../../utils';
import ReportCard from './card';
import { Content, Header, RightText, Title } from '@components/headers';

export default async function MisRespuestas(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);
  const respuestas = await prisma.report.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      date: 'desc'
    },
    take: 50
  });
  return (
    <div>
      <Header>
        <Title>Mis respuestas</Title>
        <RightText>Mostrando ultimas 50 respuestas</RightText>
      </Header>
      <Content>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {respuestas.map(respuesta => (
            <ReportCard report={respuesta} key={respuesta.id} />
          ))}
        </ul>
      </Content>
    </div>
  );
}
