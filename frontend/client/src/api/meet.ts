import {CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse} from "@/model/meet";
import testAxios from "@/util/testAxios";
import {QueryFunction} from "@tanstack/query-core";
import {cookies} from "next/headers";
import axios from "axios";


export const postCreateMeet = async (meetData: CreateMeetRequest):Promise<CreateMeetResponse> => {

    const token = await(await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/auth`, {
        method: 'GET'
    })).json();

    console.log(token, "!!!!!!!!!!!11");
    const accessToken = token.data.value;
    console.log(accessToken);


    try {
        const response = await testAxios().post(`/api/meet`, meetData, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}

export const getMeetInfo: QueryFunction<GetMeetInfoResponse> = async ({ queryKey }) => {
    const [_,meetId] = queryKey;
    const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExMDgwNjk4LCJzdWIiOiJzaGFxODhAZGF1bS5uZXQiLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.vaLabNJyskgDWrwJFODM2g7PaZiTOpRRbZSIfMR10w8";

    try {
        const response = await testAxios().get(`/meet/${meetId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
