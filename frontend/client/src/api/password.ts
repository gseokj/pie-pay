import {
  RequestSetPassword,
  BasicResponse,
  ResponsseSetPassword,
} from '@/model/password';
import authAxios from '@/util/authAxios';

export const postInitPassword = async (
  request: RequestSetPassword,
  token: string,
): Promise<BasicResponse> => {
  try {
    const response = await authAxios.post(
      `/api/members/verify/payment/password`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('success to get data', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
};

export const postConfirmPassword = async (
  request: RequestSetPassword,
  token: string,
): Promise<ResponsseSetPassword> => {
  try {
    const response = await authAxios.post(
      `/api/members/verify/payment/password/confirm`,
      request,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('success to get data', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
};
