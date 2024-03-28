import {Member} from './member'

export interface Participant {
    participantId: number;
    memberInfo: Member;
    isDrinkAlcohol: boolean;
    payAgree: boolean | undefined;
    payAmount: number;
}

export interface Payment {
    participantId: number;
    createdAt: string;
    participants: Participant[];
    payStatus: "OPEN" | "ING" | "COMPLETE" | "CLOSE";
}

