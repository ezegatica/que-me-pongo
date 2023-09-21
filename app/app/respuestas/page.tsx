import React, { Suspense } from 'react';
import RespuestasLista from './respuestas-lista';
import { Content, Header, RightText, Title } from '@components/headers';

export default function MisRespuestas(): JSX.Element {
  return (
    <div>
      <Header>
        <Title>Mis respuestas</Title>
        <RightText>Mostrando ultimas 50 respuestas</RightText>
      </Header>
      <Content>
        <Suspense fallback={<>Cargando...</>}>
          <RespuestasLista />
        </Suspense>
      </Content>
    </div>
  );
}
