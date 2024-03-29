import authAxios from "@/util/authAxios";
import {QueryFunction} from "@tanstack/query-core";
import {GetMyInfoResponse} from "@/model/user";


export const getMyInfo = async (token: string) => {
    try {
        const response = await authAxios.get(`api/member`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
};
