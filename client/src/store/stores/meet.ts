// store.ts
import create from 'zustand';

interface Member {
    memberId: number;
    nickname: string;
    profileImage: string;
}

interface StoreState {
    members: Member[];
    setMembers: (members: Member[]) => void;
}

export const useStore = create<StoreState>((set) => ({
    members: [],
    setMembers: (members) => set({ members }),
}));
