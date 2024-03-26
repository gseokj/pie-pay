import {CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse} from "@/model/meet";
import testAxios from "@/util/testAxios";
import {QueryFunction} from "@tanstack/query-core";
import {cookies} from "next/headers";
const axios = testAxios();


export const postCreateMeet = async (meetData: CreateMeetRequest, token: string):Promise<CreateMeetResponse> => {

    // const token = cookies().get('accessToken');
    // console.log(token);

    try {
        const response = await axios.post(`/meet`, meetData, {
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

export const getMeetInfo: QueryFunction<GetMeetInfoResponse> = async ({ queryKey }) => {
    const [_,meetId] = queryKey;
    const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExMDgwNjk4LCJzdWIiOiJzaGFxODhAZGF1bS5uZXQiLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.vaLabNJyskgDWrwJFODM2g7PaZiTOpRRbZSIfMR10w8";

    try {
        const response = await axios.get(`/meet/${meetId}`, {
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
