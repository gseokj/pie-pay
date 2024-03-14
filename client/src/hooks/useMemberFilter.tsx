'use client'

import { useState } from 'react';

interface Member {
    memberId: number;
    nickname: string;
    profileImage: string;
    payAgree: boolean;
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
    isSelected: boolean;
    isFiltered: boolean;
    isHost: boolean;
}

export function useMemberFilter(initialMembers: Member[]) {
    const [filterMembers, setFilterMembers] = useState(initialMembers);

    const handleSearchNickname = (searchTerm: string) => {
        const updatedMembers = filterMembers.map(member => ({
            ...member,
            isFiltered: member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
        }));
        setFilterMembers(updatedMembers);
    };
    const handleType = () => {
        const updatedMembers = filterMembers.map(member => ({
            ...member,
            isTypeAlcohol: !member.isTypeAlcohol
        }));
        setFilterMembers(updatedMembers);
    };

    const handleCheck = (memberId: number, property: "payAgree"|"isDrinkAlcohol") => {

        let updatedMembers = filterMembers.map(member =>
            member.memberId === memberId ? { ...member, [property]: !member[property] } : member
        );
        if(property==='payAgree'){
            updatedMembers = updatedMembers.map(member =>
                member.memberId === memberId ? { ...member, isSelected: !member.isSelected } : member);
        }
        setFilterMembers(updatedMembers);

    };
    const setHost = (memberId: number) => {
        setFilterMembers(prevState => {
            const newState = [...prevState];
            newState.forEach(member => {
                if (member.memberId === memberId) {
                    member.isHost = true;
                }
            });

            return newState;
        });
    }
    return {filterMembers, setFilterMembers, handleSearchNickname, handleType, handleCheck ,setHost};
}
