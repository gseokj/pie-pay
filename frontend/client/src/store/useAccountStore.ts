import { create } from 'zustand';

interface AccountInfo {
  bankCode: string;
  accountNo: string;
}

type Store = {
  accountInfo: AccountInfo;
  setAccountInfo: (newAccountInfo: AccountInfo) => void;
};

export const useStore = create<Store>((set) => ({
  accountInfo: { bankCode: '', accountNo: '' },
  setAccountInfo: (newAccountInfo) => set({ accountInfo: newAccountInfo }),
}));
