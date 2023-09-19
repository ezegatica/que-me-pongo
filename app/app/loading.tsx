import React from 'react';
import { Content, Header, Title } from '../(components)/headers';

export default function Loading(): JSX.Element {
  return (
    <>
      <Header>
        <Title loading> </Title>
      </Header>
      <Content loading> </Content>
    </>
  );
}
