import {QueryFunction} from "@tanstack/query-core";
import authAxios from "@/util/authAxios";
import {Meet} from "@/model/meet/meets";

export const getMeetList:QueryFunction<Meet[]> = async ({ queryKey }) => {
    const [_,token] =queryKey;
    try {
        const response = await authAxios.get(`/api/meets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
};