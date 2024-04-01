import { create } from 'zustand'

type Store = {
    isVisible: boolean
    updateState: () => void
}

export const useCheckModal = create<Store>()((set) => ({
    isVisible: false,
    updateState: () => set((state) => ({ isVisible: !state.isVisible  })),
}))


