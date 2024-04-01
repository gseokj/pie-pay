import {
    CreateMeetResponse,
    CreateMeetRequest,
    GetMyMeetsResponse,
    Member,
    MemberResponse, MeetInfoResponse, DefaultResponse, Meet, MeetData
} from "@/model/meet";
import authAxios from "@/util/authAxios";
import {QueryFunction} from "@tanstack/query-core";
import axios from "axios";
import {GetMyInfoResponse} from "@/model/user";
import {cookies} from "next/headers";
import {NextRequest} from "next/server";
import {Payment} from "@/model/meet/payment";


export const getMeetInfo: QueryFunction<Meet> = async ({ queryKey }) => {
    const [_,meetId,token] = queryKey;
    try {
        console.log("ff");
        const response = await authAxios.get(`/api/meet/${meetId}`, {
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


export const getMeetMembers:QueryFunction<Member[]> = async ({ queryKey }) => {
    const [_, meetId, token] = queryKey;
    try {
        const response = await authAxios.get(`api/meet/${meetId}/member`, {
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

export const deleteMeet = async (meetId: string, token: string): Promise<DefaultResponse> => {
    try {
        const response = await authAxios.delete(`api/meet/${meetId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get Meet Member data', error);
        throw new Error('Failed to get Meet Member data');
    }
}

export const fixMeet = async (meetId: string, token: string): Promise<DefaultResponse> => {
    try {
        const response = await authAxios({
            method: 'PATCH',
            url: `api/meet/${meetId}/favorite`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to get Meet Member data', error);
        throw new Error('Failed to get Meet Member data');
    }
}

export const getMeetPayments:QueryFunction<Payment[]> = async ({ queryKey }) => {
    const [_, meetId, token] = queryKey;
    try {
        const response = await authAxios.get(`api/meet/${meetId}/payment`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to get Meet Payment data', error);
        throw new Error('Failed to get Meet Payment data');
    }
}







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
