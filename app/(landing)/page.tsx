import Link from 'next/link';
import React from 'react';

export const dynamic = 'force-static';

export default function Landing(): JSX.Element {
  return (
    <div className="text-white text-center">
      <h1 className="text-6xl mb-2">que me pongo</h1>
      <p className="mb-2">ponele que asi funcionan las apps</p>

      <Link href="/app">
        <button
          type="button"
          className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Entrar a la app
        </button>
      </Link>
    </div>
  );
}
