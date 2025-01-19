'use client';

import { SessionProvider } from 'next-auth/react';
import React, { type JSX } from 'react';

export function Providers({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <SessionProvider>{children}</SessionProvider>;
}
