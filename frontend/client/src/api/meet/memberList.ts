import {QueryFunction} from "@tanstack/query-core";
import {MeetMember} from "@/model/meet/member";
import authAxios from "@/util/authAxios";

export const getMeetMemberList:QueryFunction<MeetMember[]> = async ({ queryKey }) => {
    const [_, meetId, token] = queryKey;
    try {
        const response = await authAxios.get(`api/meet/${meetId}/members`, {
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