'use client';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  BeakerIcon,
  CalendarIcon,
  ClipboardDocumentIcon,
  CloudIcon,
  Cog6ToothIcon,
  PencilSquareIcon,
  UserCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Session } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';
import React, { Fragment, useState } from 'react';
import { classNames, proxy } from '../utils';

export default function Sidebar(): JSX.Element {
  const pathname = usePathname();

  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigation = [
    {
      name: 'Formulario',
      href: '/app',
      icon: PencilSquareIcon,
      current: pathname === '/app'
    },
    {
      name: 'Que ponerme',
      href: '/app/ask',
      icon: BeakerIcon,
      current: pathname === '/app/ask'
    },
    {
      name: 'Planificar salida',
      href: '/app/salida',
      icon: CalendarIcon,
      current: pathname === '/app/salida'
    },
    {
      phoneOnly: true,
      name: 'Pronostico',
      href: '/app/pronostico',
      icon: CloudIcon,
      current: pathname === '/app/pronostico'
    },
    {
      name: 'Mis Respuestas',
      href: '/app/respuestas',
      icon: ClipboardDocumentIcon,
      current: pathname === '/app/respuestas'
    },
    {
      name: 'Configuración',
      href: '/app/settings',
      icon: Cog6ToothIcon,
      current: pathname === '/app/settings'
    }
  ];

  const handleClickUser = async () => {
    if (!session?.user) {
      return signIn();
    }
  };

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      className="h-8 w-auto"
                      width={32}
                      height={32}
                      src="/qmp.png"
                      alt="Your Company"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map(item => (
                            <li
                              key={item.name}
                              className={classNames(
                                item.phoneOnly ? 'block lg:hidden' : ''
                              )}
                            >
                              <Link
                                href={item.href}
                                className={classNames(
                                  item.current
                                    ? 'bg-gray-800 text-white'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                  'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                onClick={() => setSidebarOpen(false)}
                              >
                                <item.icon
                                  className="h-6 w-6 shrink-0"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="-mx-6 mt-auto">
                        <button
                          className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 w-full"
                          onClick={handleClickUser}
                        >
                          <UserSlot session={session} status={status} />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
          <div className="flex h-16 shrink-0 items-center">
            <Image
              className="h-8 w-auto"
              width={32}
              height={32}
              src="/qmp.png"
              alt="Your Company"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map(item => (
                    <li
                      key={item.name}
                      className={classNames(
                        item.phoneOnly ? 'block lg:hidden' : ''
                      )}
                    >
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800',
                          'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                        )}
                      >
                        <item.icon
                          className="h-6 w-6 shrink-0"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <Link
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800 w-full"
                  href="/app/settings"
                >
                  <UserSlot session={session} status={status} />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="xl:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

const UserSlot = ({
  session,
  status
}: {
  session: Session | null;
  status: 'authenticated' | 'loading' | 'unauthenticated';
}): React.ReactNode => {
  if (status === 'loading') {
    return (
      <>
        <UserCircleIcon className="h-8 w-8 rounded-full bg-black-800" />
        <span className="sr-only">Cargando...</span>
        <span className="animate-pulse bg-gray-800 px-12 py-2"></span>
      </>
    );
  }

  if (session?.user) {
    return (
      <>
        {session.user.image ? (
          <Image
            width={64}
            height={64}
            quality={75}
            className="h-8 w-8 rounded-full bg-gray-800"
            src={proxy(session.user.image)}
            alt=""
          />
        ) : (
          <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-800" />
        )}
        <span className="sr-only">Tu perfil</span>
        <span aria-hidden="true">{session.user.name}</span>
      </>
    );
  } else {
    <>
      <UserCircleIcon className="h-8 w-8 rounded-full bg-gray-800" />
      <span>Iniciar sesión</span>
    </>;
  }
};
