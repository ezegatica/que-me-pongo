import React, { type JSX } from 'react';

export function Header({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      {children}
    </header>
  );
}

export function Title({
  children,
  loading = false
}: {
  children: React.ReactNode;
  loading?: boolean;
}): JSX.Element {
  if (loading) {
    return (
      <h1 className="animate-pulse bg-gray-800 px-16 py-2 text-base font-semibold leading-7 text-white"></h1>
    );
  }
  return (
    <h1 className="text-base font-semibold leading-7 text-white">{children}</h1>
  );
}

export function Content({
  children,
  loading = false
}: {
  children: React.ReactNode;
  loading?: boolean;
}): JSX.Element {
  if (loading) {
    return (
      <div className="px-4 lg:px-12 py-2 lg:py-8">
        <p className="animate-pulse bg-gray-800 px-24 py-2"></p>
      </div>
    );
  }
  return <div className="px-4 lg:px-12 py-2 lg:py-8">{children}</div>;
}

export function RightText({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}): JSX.Element {
  return (
    <span
      title={title}
      className="flex items-center gap-x-1 text-sm font-medium leading-6 text-white relative"
    >
      {' '}
      {children}
    </span>
  );
}
