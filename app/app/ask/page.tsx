import React from 'react';
import { Content, Header, Title } from '@components/headers';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import { Clothes, getOutfitByWeather, getUser } from '../../utils';

export default async function MisRespuestas() {
  const { user } = await getUser(authOptions);
  const outfit = await getOutfitByWeather(user);

  const upper = Clothes.Upper[outfit.upper];
  const lower = Clothes.Lower[outfit.lower];
  return (
    <div>
      <Header>
        <Title>Que te pondrías basado en tus respuestas, {user.name}</Title>
      </Header>
      <Content>
        <p>😎</p>
        <p>{upper.emoji} {upper.displayName}</p>
        <p>{lower.emoji} {lower.displayName}</p>
        <p>👞</p>
      </Content>
    </div>
  );
}
