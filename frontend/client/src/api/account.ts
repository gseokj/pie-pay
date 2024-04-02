import { QueryFunction } from "@tanstack/query-core";
import {Account} from "@/model/account";
import authAxios from '@/util/authAxios';

export const getAccount: QueryFunction<Account[]> = async ({ queryKey }) => {
    const [_,token] =queryKey;
    try {
        const res = await authAxios.get('api/member/accounts',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data.result;
    } catch (error) {
         // console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
