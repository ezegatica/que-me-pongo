import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans } from 'next/font/google';
import { Providers } from '@components/provider';

const noto = Noto_Sans({ subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
  title: '¿Qué me pongo?, by Eze Gatica',
  description:
    '¿Cansado de no saber si hace o mucho calor o mucho frío? ¡No busques más!. Basado en tus respuestas anteriores, te diremos que ropa ponerte.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`h-full bg-gray-900 ${noto.className}`}>
      <body className="h-full">
        {children}
      </body>
    </html>
  );
}
