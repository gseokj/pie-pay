import { QueryFunction } from "@tanstack/query-core";
import { FilterMember, Member } from '@/model/member';
import localAxios from "@/util/localAxios";
import { DefaultResponse } from '@/model/meet';
import authAxios from '@/util/authAxios';
import { Payment } from '@/model/participant';
const axios = localAxios();

export const getMembers: QueryFunction<Member[]> = async ({ queryKey }) => {
    const [_,meetId] = queryKey;
    try {
        const res = await axios.get(`api/meet/${meetId}`);
        return res.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}

export const postParticipant = async (meetId: string, token: string, filterMembers: FilterMember[]): Promise<Payment> => {
    try {
        const response = await authAxios.post(`/api/pay/parties?meetId=${meetId}`, filterMembers, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Meet Member data', error);
        throw new Error('Failed to get Meet Member data');
    }
}
