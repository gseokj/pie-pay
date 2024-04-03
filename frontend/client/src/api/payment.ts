import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
import {Payment, PaymentResult} from "@/model/participant";
import authAxios from '@/util/authAxios';


export const getPayment:QueryFunction<Payment> = async ({ queryKey }) => {
    const [_,payId,token] = queryKey;
    console.log("토큰",token);
    try {
        const response = await authAxios.get(`/api/pay/parties/${payId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Meet Payment data', error);
        throw new Error('Failed to get Meet Payment data');
    }
}


export const getPaymentResult: QueryFunction<PaymentResult> = async ({ queryKey }) => {
    const [_,payId,token] = queryKey;
    try {
        const response = await authAxios.get(`/api/pay/info/${payId}`, {

            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}