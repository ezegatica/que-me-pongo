'use client';
import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function FormButton({
  children,
  variant,
  type = 'button',
  disabled = false
}: {
  children: React.ReactNode;
  variant: 'primary' | 'secondary' | 'danger';
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}): JSX.Element {
  const { pending } = useFormStatus();
  const classByVariant = () => {
    switch (variant) {
      case 'primary':
        return 'disabled:bg-indigo-600/30 disabled:cursor-not-allowed disabled:opacity-80 mt-3 inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
      case 'secondary':
        return 'disabled:bg-white/80 disabled:cursor-not-allowed disabled:opacity-50 mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50';
      case 'danger':
        return 'disabled:bg-red-600/30 disabled:cursor-not-allowed disabled:opacity-80 mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600';
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || pending}
      className={classByVariant()}
    >
      {children}
    </button>
  );
}
