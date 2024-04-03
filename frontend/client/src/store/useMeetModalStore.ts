import create from 'zustand';

interface ModalStore {
    isInviteModalOn: boolean;
    changeInviteModalStatus: () => void;
    setInviteModalStatus: (status: boolean) => void;
    isReceiptModalOn: boolean;
    changeReceiptModalStatus: () => void;
    setReceiptModalStatus: (status: boolean) => void;
    payId: number|undefined;
    setPayId: (payId:number) => void;
}

export const useStore = create<ModalStore>(set => ({
    isInviteModalOn: false,
    changeInviteModalStatus: () => set(state => ({ isInviteModalOn: !state.isInviteModalOn })),
    setInviteModalStatus: (status:boolean) => set(state => ({isInviteModalOn: status})),
    isReceiptModalOn: false,
    changeReceiptModalStatus: () => set(state => ({ isReceiptModalOn: !state.isReceiptModalOn })),
    setReceiptModalStatus: (status:boolean) => set(state => ({isReceiptModalOn: status})),
    payId: undefined,
    setPayId: (payId:number) => set(state => ({ payId: payId })),
}));
