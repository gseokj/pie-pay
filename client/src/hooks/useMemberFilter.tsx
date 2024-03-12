import { useState } from 'react';

interface Member {
    memberId: number;
    nickname: string;
    profileImage: string;
    payAgree: boolean;
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
}

export function useMemberFilter(initialMembers:Member[]) {
    const [filterMembers, setFilterMembers] = useState(initialMembers);

    const handleSearchNickname = (searchTerm:string) => {

        const filteredMembers = initialMembers.filter(member =>
            member.nickname.includes(searchTerm)
        );
        setFilterMembers(filteredMembers);
    };


    return { filterMembers,setFilterMembers,handleSearchNickname };
}
