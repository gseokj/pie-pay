export interface Member{
    memberId: number;
    nickname: string;
    profileImage: string;
}
export interface Me extends Member{
    phoneNumber: string;
    email: string;
}

export interface FilterMember extends Member {
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
    isSelected: boolean;
    isFiltered: boolean;
    isHost: boolean;
}