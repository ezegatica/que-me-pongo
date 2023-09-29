'use server';

import { authOptions } from '../../auth';
import { FutureResponse, getOutfitByFutureWeather, getUser } from '../../utils';

export const getRangeWeather = async (
  hoursOut: number
): Promise<FutureResponse> => {
  const { user } = await getUser(authOptions);

  const outfit = await getOutfitByFutureWeather(user, hoursOut);
  return outfit;
};
