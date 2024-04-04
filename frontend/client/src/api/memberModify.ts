import authAxios from '@/util/authAxios';
import { RequestMemberModify, ResponseMemberModify } from '@/model/myPage';

export const putMemberModify = async (
  request: RequestMemberModify,
  token: string,
): Promise<ResponseMemberModify> => {
  try {
    const response = await authAxios.put(`/api/member`, request, {
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
