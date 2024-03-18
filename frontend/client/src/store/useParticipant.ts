import { create } from 'zustand'
import {Participant} from "@/model/participant";
import {FilterMember} from "@/model/member";

type State = {
    participants: Participant[],
    setParticipant: (Participant: Participant[]) => void
    handlePayAgree: (participantId: number, payState: "await"|"agree"|"deny") => void;
}

const useParticipant = create<State>()((set) => ({
    participants: [],
    setParticipant: (participants)=>{set({participants: participants.map(participant=>({
            ...participant,
            payState:"await"
        }))})
    },
    handlePayAgree: (participantId, property) => set((state) => ({
        participants: state.participants.map(participant =>
            participant.participantId === participantId ? { ...participant, payState: property } : participant
        )
    })),
}))


