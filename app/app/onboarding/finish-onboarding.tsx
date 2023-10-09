'use client';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import FormButton from '../../(components)/form-button';
import { Toast } from '../../(components)/toast';
import { finishOnboardingApi } from './actions';

export default function FinishOnboarding({
  user
}: {
  user: User;
}): JSX.Element {
  const router = useRouter();
  const finishOnboarding = async () => {
    await finishOnboardingApi(user.id);
    Toast.fire({
      title: 'Todo listo!',
      text: 'Puedes usar la aplicación',
      icon: 'success'
    });
    router.push('/app');
    router.refresh();
  };
  return (
    <form action={finishOnboarding}>
      <FormButton variant="primary" type="submit">
        Terminar configuración de cuenta
      </FormButton>
    </form>
  );
}
