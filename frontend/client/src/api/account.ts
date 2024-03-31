import { QueryFunction } from "@tanstack/query-core";
import {Account, AccountResponse} from "@/model/account";
import authAxios from '@/util/authAxios';

export const getAccount: QueryFunction<AccountResponse> = async ({ queryKey }) => {
    const [_,token] =queryKey;
    try {
        const res = await authAxios.get('api/member/accounts',{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
