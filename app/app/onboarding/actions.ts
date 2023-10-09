'use server';

import { prisma } from '../../db';

export async function finishOnboardingApi(userId: string): Promise<void> {
  await prisma.user.update({
    where: { id: userId },
    data: { onboarded: true }
  });
}
