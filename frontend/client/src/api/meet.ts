import {CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse} from "@/model/meet";
import testAxios from "@/util/testAxios";
import authAxios from "@/util/authAxios";
import {QueryFunction} from "@tanstack/query-core";


export const postCreateMeet = async (meetData: CreateMeetRequest):Promise<CreateMeetResponse> => {

    try {
        const axiosInstance = await authAxios();
        const response = await axiosInstance.post(`/api/meet`, meetData);
        console.log('success to get data', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}

export const getMeetInfo: QueryFunction<GetMeetInfoResponse> = async ({ queryKey }) => {
    const [_,meetId] = queryKey;
    console.log(meetId, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

    try {
        console.log("ff");
        const axiosInstance = await authAxios();
        const response = await axiosInstance.get(`/api/meet/${meetId}`);
        console.log('success to get data', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to get data', error);
        throw new Error('Failed to get data');
    }
}
