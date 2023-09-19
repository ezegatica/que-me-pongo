"use server";

import React from 'react';
import { Header, Content, Title, RightText } from '@components/headers';
import { getUser } from '../../utils';
import { prisma } from '../../db';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import ReportCard from './card';

export default async function MisRespuestas() {
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
        <RightText>
          Mostrando ultimas 50 respuestas
        </RightText>
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
