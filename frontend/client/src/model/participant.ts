import {Member} from './member'

export interface Participant extends Member{
    participantId: number,
    payAgree: boolean,
    paystate: "await" | "agree" | "deny";
}