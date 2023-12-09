import React from 'react';
import AvisoBanner from '../(components)/aviso-banner';
import OnboarderBanner from '../(components)/onboarder-banner';
import { authOptions } from '../auth';
import { getAviso, getUser } from '../utils';

export default async function Banners(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);
  const { mensaje } = await getAviso();

  return (
    <>
      <OnboarderBanner user={user} />
      <AvisoBanner aviso={mensaje} />
    </>
  );
}
