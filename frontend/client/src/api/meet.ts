import {CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse} from "@/model/meet";
import authAxios from "@/util/authAxios";
import {QueryFunction} from "@tanstack/query-core";
import axios from "axios";
import {GetMyInfoResponse} from "@/model/user";
import {cookies} from "next/headers";
import {NextRequest} from "next/server";


export const postCreateMeet = async (meetData: CreateMeetRequest, token: string):Promise<CreateMeetResponse> => {

    try {
        const response = await authAxios.post(`/api/meet`, meetData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('success to get data', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}

export const getMeetInfo: QueryFunction<GetMeetInfoResponse> = async ({ queryKey }) => {
    const [_,meetId,token] = queryKey;
    try {
        console.log("ff");
        const response = await authAxios.get(`/api/meet/${meetId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('success to get data', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
}

export const getMyMeets:QueryFunction<GetMyInfoResponse> = async ({ queryKey }) => {
    const [_,token] =queryKey;
    try {
        const response = await authAxios.get(`/api/member/meets`, {
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

export const refreshRequest = async (token: string) => {
    try {
        const response = await authAxios({
            method: 'POST',
            url: `/api/token/refresh`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
        return response;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
}
