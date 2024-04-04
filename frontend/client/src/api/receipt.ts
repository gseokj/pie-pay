import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
import { Receipt } from '@/model/receipt';
import authAxios from '@/util/authAxios';

export const getReceipt: QueryFunction<Receipt> = async ({ queryKey }) => {
  const [_,payId,token] = queryKey;
  try {
    const res = await authAxios.get(`/api/pay/info/receipt/${payId}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      },
    });
    console.log(res.data.result);
    return res.data.result;

  } catch (error) {
    console.error('Failed to fetch data', error);
    throw new Error('Failed to fetch data');
  }
}
