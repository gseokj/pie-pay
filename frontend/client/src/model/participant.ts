import {Member} from './member'

export interface Participant {
    participantId: number,
    memberInfo: Member,
    isDrinkAlcohol: boolean,
    payAgree: boolean,
    // client 속성
    memberPayState: "await" | "agree" | "deny";

}

export interface Participants {
    participantId: number,
    participant: Participant[]
    payStatus: boolean
}