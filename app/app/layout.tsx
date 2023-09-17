import Sidebar from './sidebar';
import Infobar from './infobar';
import React from 'react';
import { Providers } from '../(components)/provider';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Sidebar />
      <main className="xl:pl-72 lg:pr-96 text-white">{children}</main>
      <Infobar />
    </Providers>
  );
}
