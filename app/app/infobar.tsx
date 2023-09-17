import React from 'react';
import {  getUser, proxy } from '../utils';
import { authOptions } from '../api/auth/[...nextauth]/route';
import Image from 'next/image';

export default async function Infobar() {
  const {user} = await getUser(authOptions);
  const activityItems = [
    {
      user: {
        name: user.name,
        imageUrl:
        proxy(user.image || '') 
      },
      projectName: 'ios-app',
      commit: '2d89f0c8',
      branch: 'main',
      date: '1h',
      dateTime: '2023-01-23T11:00'
    }
    // More items...
  ];
  return (
    <aside className="bg-black/10 lg:fixed lg:bottom-0 lg:right-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h2 className="text-base font-semibold leading-7 text-white">
          Activity feed
        </h2>
        <a href="#" className="text-sm font-semibold leading-6 text-indigo-400">
          View all
        </a>
      </header>
      <ul role="list" className="divide-y divide-white/5">
        {activityItems.map(item => (
          <li key={item.commit} className="px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-x-3">
              <Image
                src={item.user.imageUrl}
                width={32}
                height={32}
                quality={50}
                alt=""
                className="h-6 w-6 flex-none rounded-full bg-gray-800"
              />
              <h3 className="flex-auto truncate text-sm font-semibold leading-6 text-white">
                {item.user.name}
              </h3>
              <time
                dateTime={item.dateTime}
                className="flex-none text-xs text-gray-600"
              >
                {item.date}
              </time>
            </div>
            <p className="mt-3 truncate text-sm text-gray-500">
              Pushed to{' '}
              <span className="text-gray-400">{item.projectName}</span> (
              <span className="font-mono text-gray-400">{item.commit}</span> on{' '}
              <span className="text-gray-400">{item.branch}</span>)
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
