import authAxios from "@/util/authAxios";
import {QueryFunction} from "@tanstack/query-core";
import {GetMyInfoResponse} from "@/model/user";


export const getMyInfo = async () => {
    try {
        const axiosInstance = await authAxios();
        const response = await axiosInstance.get(`api/member`);
        return response.data;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
};
