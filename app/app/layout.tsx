import '../globals.css';
import type { Metadata } from 'next';
import Sidebar from '../sidebar';


export const metadata: Metadata = {
  title: '¿Que me pongo?, by Eze Gatica',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
