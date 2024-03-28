import { create } from 'zustand';
import { Participant, Payment } from '@/model/participant';


interface ParticipantSocketRes {
  payId:number;
  participantId:number;
  payAgree:boolean;
  payStatus: "OPEN" | "ING" | "COMPLETE" | "CLOSE";
}
type Store = {
  payment: Payment|null;
  setPayment: (payment: Payment | null) => void;
  updatePayment:(res:ParticipantSocketRes) => void;
  isLoading: boolean;
};
export const usePayment = create<Store>((set) => ({
  payment: null,
  isLoading: true,
  setPayment: (payment) => {
    set({ isLoading: false });
    if (payment) {
      set({
        payment: {
          ...payment,
          participants: payment.participants.map((participant) => ({
            ...participant,
            payAgree: participant.payAgree === false ? undefined : participant.payAgree,
          })),
        },
      });
    } else {
      set({ payment: null, isLoading: false });
    }
  },
  updatePayment: (res) => {
    set((state) => {
      const updatedParticipants = state.payment?.participants.map((participant) => {
        if (participant.participantId === res.participantId) {
          return {
            ...participant,
            payAgree: res.payAgree,
          };
        }
        return participant;
      });
      return {
        ...state,
        payment: state.payment
          ? {
            ...state.payment,
            payStatus: res.payStatus,
            participants: updatedParticipants || state.payment.participants,
          }
          : null,
      };
    });
  },
}));
