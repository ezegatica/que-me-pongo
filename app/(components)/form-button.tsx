'use client';
import React from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

export default function FormButton({
  children,
  variant,
  type
}: {
  children: React.ReactNode;
  variant: 'primary' | 'secondary';
  type: 'submit' | 'reset' | 'button';
}) {
  const { pending } = useFormStatus();
  const classByVariant = () => {
    switch (variant) {
      case 'primary':
        return 'rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo disabled:bg-indigo-300/30 disabled:cursor-not-allowed disabled:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500';
      case 'secondary':
        return 'rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 disabled:bg-white/20 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500';
    }
  };
  return (
    <button type={type} disabled={pending} className={classByVariant()}>
      {children}
    </button>
  );
}
