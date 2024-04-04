import { QueryFunction } from "@tanstack/query-core";
import localAxios from "@/util/localAxios";
import {Notification} from "@/model/notification"
import { MeetInfoResponse } from '@/model/meet';
import authAxios from '@/util/authAxios';

const axios = localAxios();

export const getNotification: QueryFunction<Notification[]> = async ({ queryKey }) => {
    const [_,token] = queryKey;
    try {
        const response = await authAxios.get(`/api/notifications`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        return response.data.result;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
}

export const getReadCount: QueryFunction<Number> = async ({ queryKey }) => {
    const [_,token] = queryKey;
    try {
        const response = await authAxios.get(`/api/notifications/existence`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('success to get data', response.data);
        return response.data.result;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
}