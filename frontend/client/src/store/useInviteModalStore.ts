import create from 'zustand';

interface ModalStore {
    isModalOn: boolean;
    changeModalStatus: () => void;
}

export const useStore = create<ModalStore>(set => ({
    isModalOn: false,
    changeModalStatus: () => set(state => ({ isModalOn: !state.isModalOn }))
}));
