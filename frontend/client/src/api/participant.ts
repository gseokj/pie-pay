import { MutationFunction } from "@tanstack/query-core";
import { FilterMember } from "@/model/member";
import localAxios from "@/util/localAxios";
import { Participants } from "@/model/participant";

const axios = localAxios();

export const postParticipant: MutationFunction<Participants, FilterMember[]> = async (filterMembers) => {
    try {
        // filterMembers를 이용하여 어떤 작업을 수행하고 새로운 참가자 데이터를 추가한다고 가정
        // 예를 들어, filterMembers를 사용하여 새로운 참가자를 생성하는 API를 호출한다고 가정
        const res = await axios.post<Participants>('/add/participant', filterMembers);
        return res.data; // 새로운 참가자 데이터를 반환
    } catch (error) {
        console.error('Failed to add participant', error);
        throw new Error('Failed to add participant');
    }
};


