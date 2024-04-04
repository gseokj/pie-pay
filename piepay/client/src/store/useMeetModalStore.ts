import create from 'zustand';

interface ModalStore {
    isInviteModalOn: boolean;
    changeInviteModalStatus: () => void;
    setInviteModalStatus: (status: boolean) => void;

    isReceiptModalOn: boolean;
    changeReceiptModalStatus: () => void;
    setReceiptModalStatus: (status: boolean) => void;

    isUserReceiptModalOn: boolean;
    changeUserReceiptModalStatus: () => void;
    setUserReceiptModalStatus: (status: boolean) => void;

    payId: number|undefined;
    setPayId: (payId: number) => void;

    isUserDebtModalOn: boolean;
    changeUserDebtModalStatus: () => void;
    setUserDebtModalStatus: (status: boolean) => void;

    payInsteadId: number|undefined;
    setPayInsteadId: (payInsteadId: number) => void;
}

export const useStore = create<ModalStore>(set => ({
    isInviteModalOn: false,
    changeInviteModalStatus: () => set(state => ({ isInviteModalOn: !state.isInviteModalOn })),
    setInviteModalStatus: (status: boolean) => set(state => ({isInviteModalOn: status})),

    isReceiptModalOn: false,
    changeReceiptModalStatus: () => set(state => ({ isReceiptModalOn: !state.isReceiptModalOn })),
    setReceiptModalStatus: (status: boolean) => set(state => ({isReceiptModalOn: status})),

    isUserReceiptModalOn: false,
    changeUserReceiptModalStatus: () => set(state => ({ isUserReceiptModalOn: !state.isUserReceiptModalOn })),
    setUserReceiptModalStatus: (status: boolean) => set(state => ({isUserReceiptModalOn: status})),

    payId: undefined,
    setPayId: (payId: number) => set(state => ({ payId: payId })),

    isUserDebtModalOn: false,
    changeUserDebtModalStatus: () => set(state => ({ isUserDebtModalOn: !state.isUserDebtModalOn })),
    setUserDebtModalStatus: (status: boolean) => set(state => ({isUserDebtModalOn: status})),

    payInsteadId: undefined,
    setPayInsteadId: (payInsteadId: number) => set(state => ({ payInsteadId: payInsteadId })),
}));
