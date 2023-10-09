'use server';

import { authOptions } from '../../auth';
import { prisma } from '../../db';
import {
  CityResponse,
  getUser,
  reverseSearchCity,
  searchCity
} from '../../utils';

export const searchCityApi = async (query: string): Promise<CityResponse[]> => {
  const city = await searchCity(query);
  return city;
};

export const reverseSearchCityApi = async (
  lat: number,
  lon: number
): Promise<CityResponse> => {
  const city = await reverseSearchCity(lat, lon);
  return city[0];
};

export const updateUserCity = async (city: CityResponse): Promise<void> => {
  const { user } = await getUser(authOptions);
  await prisma.user.update({
    where: { id: user.id },
    data: {
      cityName: city.name,
      cityLat: city.lat,
      cityLon: city.lon,
      cityCountry: city.country
    }
  });
};
