import create from 'zustand';
import { PaymentResult } from '@/model/participant';

type PaymentResultStore = {
  paymentResult: PaymentResult | null;
  setPaymentResult: (newPaymentResult: PaymentResult) => void;
  isLoading:boolean;
};

export const usePaymentResult = create<PaymentResultStore>((set) => ({
  paymentResult: null,
  isLoading: true,
  setPaymentResult: (newPaymentResult) => {
    set({ isLoading: false });
    set({ paymentResult: newPaymentResult })
  },
}));
