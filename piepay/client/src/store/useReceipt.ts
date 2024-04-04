import create from 'zustand';
import { Receipt } from '@/model/receipt';


type ReceiptStore = {
  receipt: Receipt | null;
  setReceipt: (newReceipt: Receipt) => void;
  isLoading:boolean;
};

export const useReceipt = create<ReceiptStore>((set) => ({
  receipt: null,
  isLoading:true,

  setReceipt: (newReceipt) => {
    set({ isLoading: false });
    set({ receipt: newReceipt })
  },
}));
