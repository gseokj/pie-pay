import { QueryFunction } from "@tanstack/query-core";
import {Account} from "@/model/account";
import authAxios from '@/util/authAxios';

export const getAccount: QueryFunction<Account> = async () => {
        const axios = await authAxios();
    try {
        const res = await axios.get('/members/accounts',{
        });
        console.log(res);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
