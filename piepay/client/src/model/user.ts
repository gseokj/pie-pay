export interface MyInfo {
    memberId: number;
    nickname: string;
    profileImage: string;
    phoneNumber: string;
    memberRole: string;
    email: string;
}

export interface GetMyInfoResponse {
    status: string;
    message: string;
    result: MyInfo;
}