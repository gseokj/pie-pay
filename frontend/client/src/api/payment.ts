import { QueryFunction } from "@tanstack/query-core";
import { Member } from "@/model/member";
import localAxios from "@/util/localAxios";
import {Payment} from "@/model/participant";
const axios = localAxios();

const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNTAwMTQzLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.hGZ4jBwzHS-qnjwhJtNA2UcxqiwAg4uVfIUhdv-RJzI";

export const getPayment: QueryFunction<Payment> = async ({ queryKey }) => {
    const [_,payId] = queryKey;
    try {
        const response = await axios.get(`/api/pay/parties/${payId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
