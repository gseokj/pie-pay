import { create } from 'zustand';

interface Password {
  value0: string;
  value1: string;
  value2: string;
  value3: string;
  value4: string;
  value5: string;
}

type Store = {
  password: Password;
  setPassword: (newPassword: Password) => void;
};

export const useStore = create<Store>()((set) => ({
  password: {
    value0: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
  },
  setPassword: (newPassword) => set({ password: newPassword }),
}));
