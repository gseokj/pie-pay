import {CreateMeetRequest, CreateMeetResponse} from "@/model/meet";
import authAxios from "@/util/authAxios";

export const postUserInfo = async (token: string):Promise<CreateMeetResponse> => {

  try {
    const response = await authAxios.post(`/api/meet`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('success to get data', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
}