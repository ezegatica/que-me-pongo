'use server';
import { authOptions } from '../../auth';
import { prisma } from '../../db';
import { Outfit, getUser, getUserCityWeather, userAnswered } from '../../utils';

export async function Submit(formData: Outfit): Promise<void> {
  const { user } = await getUser(authOptions);
  if (!user) {
    throw new Error('El usuario no existe en la base de datos');
  }

  const lowerSelected = formData.lower;
  const upperSelected = formData.upper;

  if (!lowerSelected || !upperSelected) {
    throw new Error('Faltan prendas en el formulario');
  }

  const userAlreadyReportedToday = await userAnswered(user);
  if (userAlreadyReportedToday) {
    throw new Error('El usuario ya respondió hoy');
  }

  const clima = await getUserCityWeather(user);

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
        dateTz: clima.timezone,
        userId: user?.id,
        lower: lowerSelected,
        upper: upperSelected,
        temp: clima.main.temp,
        rawReportId: rawReport.id
      }
    });
  });
}

export async function Edit(formData: Outfit, reportId: number): Promise<void> {
  const { user } = await getUser(authOptions);
  if (!user) {
    throw new Error('El usuario no existe en la base de datos');
  }
  const lowerSelected = formData.lower;
  const upperSelected = formData.upper;

  if (!lowerSelected || !upperSelected) {
    throw new Error('Faltan prendas en el formulario');
  }

  const report = await prisma.report.findUnique({
    where: {
      id: reportId
    }
  });

  if (!report) {
    throw new Error('El reporte no existe en la base de datos');
  }

  if (report.userId !== user.id) {
    throw new Error('Solo puedes editar reportes tuyos');
  }

  await prisma.report.update({
    where: {
      id: reportId
    },
    data: {
      lower: lowerSelected,
      upper: upperSelected
    }
  });
}
