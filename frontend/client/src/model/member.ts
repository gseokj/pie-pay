export interface Member{
    memberId: number;
    nickname: string;
    profileImage: string;
}

export interface FilterMember extends Member {
    payAgree: boolean;
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
    isSelected: boolean;
    isFiltered: boolean;
    isHost: boolean;
}