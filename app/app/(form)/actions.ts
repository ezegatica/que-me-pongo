'use server';
import { Session } from 'next-auth';
import { prisma } from '../../db';
import { Clothes, getBuenosAiresWeather } from '../../utils';

export async function Submit(formData: FormData, session: Session | null) {
  if (!session?.user?.email) {
    throw new Error('No user logged in');
  }
  const lowerSelected = formData.get(Clothes.Lower.value)?.toString();
  const upperSelected = formData.get(Clothes.Upper.value)?.toString();

  if (!lowerSelected || !upperSelected) {
    throw new Error('Missing clothes selected');
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  });

  if (!user) {
    throw new Error("User doesn't exist in database");
  }

  const clima = await getBuenosAiresWeather();

  const now = Date.now();
  const day = Math.floor(now / 1000 / 60 / 60 / 24); // Dada una timestamp, agarrar el numero de día
  const date = new Date(now);

  const newReport = await prisma.report.create({
    data: {
      day,
      date,
      userId: user?.id,
      lower: lowerSelected,
      upper: upperSelected,
      temp: clima.main.temp
    }
  });

  return newReport;
}
