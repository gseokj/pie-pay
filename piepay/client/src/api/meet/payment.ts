import authAxios from "@/util/authAxios";
import {PayMember, Receipt} from "@/model/meet/payment";

export const getPaymentReceipt = async (payId:number, token:string):Promise<Receipt> => {
    try {
        const response = await authAxios.get(`api/pay/info/receipt/${payId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Receipt data', error);
        throw new Error('Failed to get Receipt data');
    }
}

export const getPaymentMembers = async (payId:number, token:string):Promise<PayMember> => {
    try {
        const response = await authAxios.get(`api/pay/info/${payId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Receipt data', error);
        throw new Error('Failed to get Receipt data');
    }
}
