import React from 'react';
import { Header, Title, Content } from '../(components)/headers';

export default function Loading() {
  return (
    <>
      <Header>
        <Title loading> </Title>
      </Header>
      <Content loading> </Content>
    </>
  );
}
