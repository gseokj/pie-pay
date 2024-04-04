import {QueryFunction} from "@tanstack/query-core";
import authAxios from "@/util/authAxios";
import {Highlight} from "@/model/meet/highlight";

export const getMeetHighlight:QueryFunction<Highlight> = async ({ queryKey }) => {
    const [_, meetId, token] = queryKey;
    try {
        const response = await authAxios.get(`api/meet/${meetId}/highlight`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
//        console.log(response.data.result);
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Meet Member data', error);
        throw new Error('Failed to get Meet Member data');
    }
}