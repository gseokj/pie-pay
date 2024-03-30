import {
  VerifyPhoneNumber,
  VerifyPhoneNumberResponse,
  ConfirmPhoneNumber,
} from '@/model/signin';
import authAxios from '@/util/authAxios';

export const postRequestVerify = async (
  request: VerifyPhoneNumber,
  token: string,
): Promise<VerifyPhoneNumberResponse> => {
  try {
    const response = await authAxios.post(
      `/api/members/verify/phone-number`,
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

export const postRequesConfirm = async (
  request: ConfirmPhoneNumber,
  token: string,
): Promise<VerifyPhoneNumberResponse> => {
  try {
    const response = await authAxios.post(
      `/api/members/verify/phone-number/confirm`,
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
