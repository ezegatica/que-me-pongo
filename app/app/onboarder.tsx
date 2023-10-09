import React from 'react';
import OnboarderBanner from '../(components)/onboarder-banner';
import { authOptions } from '../auth';
import { getUser } from '../utils';

export default async function Onboarder(): Promise<JSX.Element> {
  const { user } = await getUser(authOptions);
  return (
    <>
      <OnboarderBanner user={user} />
    </>
  );
}
