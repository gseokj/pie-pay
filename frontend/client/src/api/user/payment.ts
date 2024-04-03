import {Meet} from "@/model/meet/meets";
import authAxios from "@/util/authAxios";
import {QueryFunction} from "@tanstack/query-core";
import {Debt, MyPayment} from "@/model/user/payments";

export const postPayback = async (payInsteadId: number, token: string) => {
    try {
        const response = await authAxios({
            method: 'POST',
            url: `api/pay/payback/${payInsteadId}`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('!!!!!!!!!!!!!!', response);
        return response.data.result;
    } catch (error) {
        console.error('Failed to payback', error);
        throw new Error('Failed to payback');
    }
}

export const getMyDebtList:QueryFunction<Debt[]> = async ({ queryKey }) => {
    const [_, token] = queryKey;
    try {
        const response = await authAxios.get(`api/member/debts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Meet Member data', error);
        throw new Error('Failed to get Meet Member data');
    }
}

export const getMyPayments:QueryFunction<MyPayment[]> = async ({ queryKey }) => {
    const [_, token] = queryKey;
    try {
        const response = await authAxios.get(`api/member/payments`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Meet Member data', error);
        throw new Error('Failed to get Meet Member data');
    }
}