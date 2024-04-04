import {QueryFunction} from "@tanstack/query-core";
import authAxios from "@/util/authAxios";
import localAxios from "@/util/localAxios";


export const getQRCode: QueryFunction<Blob> = async ({ queryKey }) => {
    const [_,payId,token] = queryKey;
    console.log(payId)
    try {
        const response = await authAxios.get(`/api/pay/qr?payId=${payId}`, {
            responseType: 'arraybuffer',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const blob = new Blob([response.data], { type: 'image/png' });
        const qrCodeURL = URL.createObjectURL(blob);

        return blob;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}