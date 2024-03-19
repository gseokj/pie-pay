import {Member} from './member'

export interface Participant {
    participantId: number;
    memberInfo: Member;
    isDrinkAlcohol: boolean;
    payAgree: "await"|"agree"|"deny";

}

export interface Participants {
    participantId: number;
    createdAt: string;
    participants: Participant[];
    payStatus: "open" | "ing" | "complete" | "close";
}