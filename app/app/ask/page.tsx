import React from 'react';
import { Header, RightText, Title } from '@components/headers';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import {
  Clothes,
  emojiByWeather,
  getBuenosAiresWeather,
  getOutfitByWeather,
  getUser,
  round
} from '../../utils';

export default async function MisRespuestas() {
  const { user } = await getUser(authOptions);
  const clima = await getBuenosAiresWeather();
  const outfit = await getOutfitByWeather(user, clima);
  return (
    <div>
      <Header>
        <Title>Que te pondrías basado en tus respuestas, {user.name}</Title>
        <RightText title={clima.weather[0].description}>
          Hacen {round(clima.main.temp)}°C{' '}
          {emojiByWeather(clima.weather[0].icon)}
        </RightText>
      </Header>
      <p>{Clothes.Upper[outfit.upper].displayName}</p>
      <p>{Clothes.Lower[outfit.lower].displayName}</p>
    </div>
  );
}
