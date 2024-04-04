import {CreateMeetRequest, CreateMeetResponse} from "@/model/meet";
import authAxios from "@/util/authAxios";
import {Meet} from "@/model/meet/meets";

export const postCreateMeet = async (meetData: CreateMeetRequest, token: string):Promise<Meet> => {

    try {
        const response = await authAxios.post(`/api/meet`, meetData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        console.log('success to get data');
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch data', error);
        throw new Error('Failed to fetch data');
    }
}


export const postJoinMeet = async (meetInvitation: string, token: string):Promise<Meet> => {
    try {
        const response = await authAxios({
            method: 'POST',
            url: `api/meet/join`,
            data: { "meetInvitation": meetInvitation },
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
        return response.data.result;
    } catch (error) {
        console.error('Failed to join Meet', error);
        throw new Error('Failed to join Meet');
    }
}