'use server';
import Link from 'next/link';
import React from 'react';
import { authOptions } from '../../auth';
import {
  getLower,
  getOutfitByActualWeather,
  getUpper,
  getUser
} from '../../utils';
import { Content, Header, Title } from '@components/headers';

export default async function MisRespuestas(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);
  const outfit = await getOutfitByActualWeather(user);

  if (!outfit.lower || !outfit.upper) {
    return (
      <div>
        <Header>
          <Title>¿Qué me pongo?</Title>
        </Header>
        <Content>
          <p>
            No hay suficientes datos para recomendar qué ponerte con esta
            temperatura
          </p>
          <Link href={'/app'}>
            <button
              type="button"
              className="mt-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Rellenar formulario
            </button>
          </Link>
        </Content>
      </div>
    );
  }

  const upper = getUpper(outfit.upper);
  const lower = getLower(outfit.lower);

  const randomCompliment = () => {
    const compliments = [
      'ademas de una buena sonrisa',
      'ademas de contento',
      'ademas de feliz'
      // Proponé mas frases abriendo un PR!
    ];

    return compliments[Math.floor(Math.random() * compliments.length)];
  };

  return (
    <div>
      <Header>
        <Title>¿Qué me pongo?</Title>
      </Header>
      <Content>
        <p className="mb-2">
          El día de hoy, {user.name}, te recomiendo ponerte,{' '}
          {randomCompliment()}:
        </p>
        <p>😎</p>
        <p>
          {upper.emoji} {upper.displayName}
        </p>
        <p>
          {lower.emoji} {lower.displayName}
        </p>
        <p>👞</p>
      </Content>
    </div>
  );
}
