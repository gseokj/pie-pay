import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
import { Receipt } from '@/model/receipt';
import authAxios from '@/util/authAxios';
import { StoreReceipt } from '@/model/store';


export const getStoreReceipt: QueryFunction<StoreReceipt> = async ({ queryKey }) => {
  const [_,payId,token] = queryKey;
  try {
    const response = await authAxios.get(`/api/your-receipt/${payId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('success to get data', response.data);
    return response.data.result;
  } catch (error) {
    console.error('Failed to get data', error);
    throw new Error('Failed to get data');
  }
}

export const postStoreReceipt: QueryFunction = async ({ queryKey }) => {
  const [_,payId,token] = queryKey;
  try {
    const response = await authAxios.post(`/api/pay/payment/${payId}`, "",{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log('success to get data', response.data);
    return response.data.result;
  } catch (error) {
    console.error('Failed to get data', error);
    throw new Error('Failed to get data');
  }
}