import React from 'react';
import { Providers } from '../(components)/provider';
import Infobar from './infobar';
import Onboarder from './onboarder';
import Sidebar from './sidebar';

export const revalidate = 3600 * (1 / 2); // 30 minutos

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <Providers>
      <Onboarder />
      <Sidebar />
      <main className="xl:pl-72 lg:pr-96 text-white">{children}</main>
      <Infobar />
    </Providers>
  );
}
