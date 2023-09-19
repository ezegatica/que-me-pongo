'use server';
import { Session } from 'next-auth';
import { prisma } from '../../db';
import { Clothes, getBuenosAiresWeather, userAnswered } from '../../utils';

export async function Submit(
  formData: FormData,
  session: Session | null
): Promise<void> {
  if (!session?.user?.email) {
    throw new Error('El usuario no inició sesión');
  }
  const lowerSelected = formData.get(Clothes.Lower.value)?.toString();
  const upperSelected = formData.get(Clothes.Upper.value)?.toString();

  if (!lowerSelected || !upperSelected) {
    throw new Error('Faltan prendas en el formulario');
  }
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email
    }
  });

  if (!user) {
    throw new Error('El usuario no existe en la base de datos');
  }

  const userAlreadyReportedToday = await userAnswered(user);
  if (userAlreadyReportedToday) {
    throw new Error('El usuario ya respondió hoy');
  }

  const clima = await getBuenosAiresWeather();

  const now = Date.now();
  const day = Math.floor(now / 1000 / 60 / 60 / 24); // Dada una timestamp, agarrar el numero de día
  const date = new Date(now);

  await prisma.$transaction(async tx => {
    const rawReport = await tx.rawReport.create({
      data: {
        city: clima.name,
        city_id: clima.id,
        country: clima.sys.country,
        lat: clima.coord.lat,
        lon: clima.coord.lon,
        humidity: clima.main.humidity,
        pressure: clima.main.pressure,
        temp: clima.main.temp,
        temp_max: clima.main.temp_max,
        temp_min: clima.main.temp_min,
        wind_deg: clima.wind.deg,
        wind_speed: clima.wind.speed,
        weather_code: clima.weather[0].id,
        weather_icon: clima.weather[0].icon
      }
    });

    await tx.report.create({
      data: {
        day,
        date,
        userId: user?.id,
        lower: lowerSelected,
        upper: upperSelected,
        temp: clima.main.temp,
        rawReportId: rawReport.id
      }
    });
  });
}
