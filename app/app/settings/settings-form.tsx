'use client';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import React from 'react';
import FormButton from '../../(components)/form-button';
import PersonalInfoTab from './tabs/personal-info/personal-info';
import UserLocationTab from './tabs/user-location/user-location';
// import UserProfilesTab from './tabs/user-profiles/user-profiles';

export default function SettingsForm({ user }: { user: User }): JSX.Element {
  const router = useRouter();
  async function logout() {
    await signOut({
      redirect: false,
      callbackUrl: '/'
    });
    router.push('/');
    router.refresh();
  }

  return (
    <div className="divide-y divide-white/5">
      <PersonalInfoTab user={user} />

      {/* <UserProfilesTab user={user} /> */}

      <UserLocationTab user={user} />

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-2 sm:px-6 md:grid-cols-4 xl:grid-cols-8 lg:px-8">
        <form
          className="flex items-start md:col-span-2"
          action={async () => {
            await logout();
          }}
        >
          <FormButton variant="danger" type="submit">
            Cerrar sesión en este dispositivo
          </FormButton>
        </form>
      </div>
    </div>
  );
}
