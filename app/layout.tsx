import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans } from 'next/font/google';

const noto = Noto_Sans({ subsets: ['latin'], weight: ['400', '500'] });

export const viewPort: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  userScalable: false,
  viewportFit: 'cover',
  colorScheme: 'dark',
  themeColor: '#eee7d8'
};

export const metadata: Metadata = {
  metadataBase: new URL('https://qmp.ezegatica.com/'),
  applicationName: '¿Qué me pongo?',
  title: '¿Qué me pongo?, by Eze Gatica',
  description:
    'Una aplicación para ayudarte a elegir que ponerte en base al clima y a tus preferencias pasadas. ¡No más perder tiempo!',
  manifest: '/manifest.json',
  themeColor: '#eee7d8',
  twitter: {
    card: 'summary',
    creator: '@ezegaticaa',
    description:
      'Una aplicación para ayudarte a elegir que ponerte en base al clima y a tus preferencias pasadas. ¡No más perder tiempo!',
    site: 'https://qmp.ezegatica.com',
    title: '¿Qué me pongo?',
    images: 'https://qmp.ezegatica.com/api/og'
  },
  openGraph: {
    description:
      'Una aplicación para ayudarte a elegir que ponerte en base al clima y a tus preferencias pasadas. ¡No más perder tiempo!',
    images: [
      {
        url: 'https://qmp.ezegatica.com/api/og',
        width: 1200,
        height: 630,
        alt: 'Imagen de portada'
      }
    ],
    siteName: '¿Qué me pongo?',
    title: '¿Qué me pongo?',
    type: 'website',
    url: 'https://qmp.ezegatica.com'
  },
  icons: {
    apple: '/icon-192x192.png'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html className={`h-full bg-gray-900 ${noto.className}`}>
      <body className="h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
