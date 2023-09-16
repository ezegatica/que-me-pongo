'use server';
import { Session } from 'next-auth';
import { prisma } from '../../db';

export async function Submit(formData: FormData, session: Session | null) {
  if (!session?.user?.email) {
    return;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  });
  console.log({
    user,
    formData: { upper: formData.get('upper'), lower: formData.get('lower') }
  });
  // Guardar en la DB del usuario
}
