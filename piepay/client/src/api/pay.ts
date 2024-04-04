import { Pay } from '@/model/pay';

import authAxios from '@/util/authAxios';

export const getPayHistory = async (token: string): Promise<Pay> => {
  try {
    const response = await authAxios.get(`/api/members/paymentsGIT`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('success to get data', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
};
