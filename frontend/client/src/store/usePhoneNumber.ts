import { create } from 'zustand';

interface PhoneNumber {
  phoneNumber: string;
}

type Store = {
  phoneNumber: PhoneNumber;
  setPhoneNumber: (newPhoneNumber: PhoneNumber) => void;
};

export const useStore = create<Store>()((set) => ({
  phoneNumber: { phoneNumber: '' },
  setPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
}));
