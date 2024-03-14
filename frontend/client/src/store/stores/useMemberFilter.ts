import create from 'zustand';
import {Member, FilterMember} from '@/model/member'



type State = {
    filterMembers: FilterMember[]
    setFilterMembers: (members: Member[]) => void;
    handleSearchNickname: (searchTerm: string) => void;
    handleType: () => void;
    handleCheck: (memberId: number, property: "payAgree"|"isDrinkAlcohol") => void;
    setHost: (memberId: number) => void;
};

export const useMemberFilter = create<State>((set) => ({
    filterMembers: [],
    setFilterMembers: (members) => {
        set({ filterMembers: members.map(member => ({
                ...member,
                payAgree: true,
                isDrinkAlcohol: true,
                isTypeAlcohol: false,
                isSelected: true,
                isFiltered: true,
                isHost: false,
            })) });
    },
    handleSearchNickname: (searchTerm) => set((state) => ({
        filterMembers: state.filterMembers.map(member => ({
            ...member,
            isFiltered: member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
        }))
    })),
    handleType: () => set((state) => ({
        filterMembers: state.filterMembers.map(member => ({
            ...member,
            isTypeAlcohol: !member.isTypeAlcohol
        }))
    })),
    handleCheck: (memberId, property) => set((state) => ({
        filterMembers: state.filterMembers.map(member =>
            member.memberId === memberId ? { ...member, [property]: !member[property] } : member
        ).map(member => {
            if (property === 'payAgree' && member.memberId === memberId) {
                return { ...member, isSelected: !member.isSelected };
            }
            return member;
        })
    })),
    setHost: (memberId) => set((state) => ({
        filterMembers: state.filterMembers.map(member => ({
            ...member,
            isHost: member.memberId === memberId ? true : member.isHost
        }))
    }))
}));