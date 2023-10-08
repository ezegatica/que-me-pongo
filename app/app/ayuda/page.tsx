import Link from 'next/link';
import React from 'react';
import { classNames } from '../../utils';
import { Content, Header, Title } from '@components/headers';

const actions = [
  {
    title: 'Request time off',
    href: '#',
    description:
      'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'
  },
  {
    title: 'Benefits',
    href: '#',
    description:
      'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'
  },
  {
    title: 'Schedule a one-on-one',
    href: '#',
    description:
      '  Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'
  },
  {
    title: 'Payroll',
    href: '#',
    description:
      'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'
  },
  {
    title: 'Submit an expense',
    href: '#',
    description:
      'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'
  },
  {
    title: 'Training',
    href: '#',
    description:
      'Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at blanditiis et quo et molestiae.'
  }
];

export default function MisRespuestas(): JSX.Element {
  return (
    <>
      <Header>
        <Title>Ayuda - Preguntas frecuentes</Title>
      </Header>
      <Content>
        <div className="divide-y divide-gray-200 overflow-hidden rounded-lg shadow sm:grid sm:grid-cols-1 sm:gap-px sm:divide-y-0 sm:gap-y-2">
          {actions.map((action, actionIdx) => (
            <div
              key={action.title}
              className={classNames(
                actionIdx === 0
                  ? 'rounded-t-lg sm:rounded-tl-lg rounded-tr-lg'
                  : '',
                actionIdx === actions.length - 1
                  ? 'rounded-b-lg sm:rounded-bl-lg rounded-br-lg'
                  : '',
                'group relative bg-black/20 p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 w-full sm:w-3/4 md:w-10/12'
              )}
            >
              <div className="mt-8">
                <h3 className="text-base font-semibold leading-6 text-white">
                  <Link href={action.href} className="focus:outline-none">
                    {/* Extend touch target to entire panel */}
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {action.description}
                </p>
              </div>
              <span
                className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-600"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                </svg>
              </span>
            </div>
          ))}
        </div>
      </Content>
    </>
  );
}
