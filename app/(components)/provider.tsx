'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

export function Providers({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
