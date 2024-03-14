interface Member{
    memberId: number;
    nickname: string;
    profileImage: string;
}

export interface Participant {
    member:Member,
    payAgree:boolean,
    isDrinkAlcohol:boolean,
    payAmount:number
}