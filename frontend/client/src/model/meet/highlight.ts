interface Highlight {
    totalMeetCount: number;
    totalPayment: number;
    averagePayment: number;
    mostAttendingMember: HighlightMember;
    memberAttendingCount: number;
    drinkCount: number;
    monthInfos: MonthInfo;
}

interface HighlightMember {
    memberId: number;
    nickname: string;
    profileImage: string;
    phoneNumber: string;
    email: string;
}

interface MonthInfo {
    month: number;
    paymentCount: number;
}

export type {
    Highlight, HighlightMember, MonthInfo
}