import {CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse} from "@/model/meet";
import testAxios from "@/util/testAxios";
import {QueryFunction} from "@tanstack/query-core";
import LocalAxios from '@/util/localAxios';
const axios = LocalAxios();


const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNjAyNjczLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfQ0VSVElGSUVEIn0.8xCi66F_2cE-encJ0vSg4iTgzDTWKonjILJf0n33Hfs";
export const postCreateMeet = async (meetData: CreateMeetRequest, token: string):Promise<CreateMeetResponse> => {

    try {
        const response = await axios.post(`/api/meet`, meetData, {
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

    try {
        const response = await axios.get(`/meet/${meetId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}
