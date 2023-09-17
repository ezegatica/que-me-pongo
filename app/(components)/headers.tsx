import React from 'react';

export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {children}
    </header>
  );
}

export function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-base font-semibold leading-7 text-white">{children}</h1>
  );
}

export function RightText({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <span title={title} className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white relative">
      {' '}
      {children}
    </span>
  );
}
