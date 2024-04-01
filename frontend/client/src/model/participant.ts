import {Member} from './member'

export interface Participant {
    participantId: number;
    memberInfo: Member;
    isDrinkAlcohol: boolean;
    payAgree: "wait" | "deny" | "agree";
    payAmount: number;
}

export interface Payment {
    participantId: number;
    payId:number;
    meetId: number;
    createdAt: string;
    participants: Participant[];
    payStatus: "OPEN" | "ING" | "COMPLETE" | "CLOSE";
}

export interface PaymentResult extends Payment{
    payInsteadList: [];
}
