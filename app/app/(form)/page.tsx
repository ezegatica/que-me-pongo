import React from 'react';
import { emojiByWeather, round, getBuenosAiresWeather } from '../../utils';
import WeatherForm from './form';
import { Header, RightText, Title } from '@components/headers';

export default async function FormPage() {
  const clima = await getBuenosAiresWeather();

  return (
    <div>
      <Header>
        <Title>
          ¿Que me pongo? - Buenos Aires
        </Title>
        <RightText
          title={clima.weather[0].description}
        >
          Hacen {round(clima.main.temp)}°C{' '}
          {emojiByWeather(clima.weather[0].icon)}
        </RightText>
      </Header>

      <WeatherForm clima={clima}/>
    </div>
  );
}
