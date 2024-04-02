import {QueryFunction} from "@tanstack/query-core";
import authAxios from "@/util/authAxios";
import localAxios from "@/util/localAxios";

const axios = localAxios();
const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNTAwMTQzLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.hGZ4jBwzHS-qnjwhJtNA2UcxqiwAg4uVfIUhdv-RJzI";

export const getQRCode: QueryFunction<Blob> = async ({ queryKey }) => {
    const [_,payId] = queryKey;
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