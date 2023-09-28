'use server';

import { authOptions } from '../../auth';
import { Outfit, getOutfitByFutureWeather, getUser } from '../../utils';

export const getRangeWeather = async (hoursOut: number): Promise<Outfit> => {
  const { user } = await getUser(authOptions);

  const outfit = await getOutfitByFutureWeather(user, hoursOut);
  return outfit;
};
