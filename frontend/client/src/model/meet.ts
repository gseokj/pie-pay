interface CreateMeetRequest {
    meetName: string;
}

interface CreateMeetResponse {
    message: string;
    result: Meet;
    status: number;
}

interface Meet {
    createdAt: string;
    updatedAt: string;
    meetId: number;
    meetName: string;
    meetImage: string|null;
    meetInvitation: string;
    memberCount: number;
}

interface MeetData {
    meet: Meet;
    topFixed: boolean;
    updated_at: string|null;
}

interface MeetInfoResponse {
    message: string;
    result: Meet;
    status: number;
}

interface GetMyMeetsResponse {
    status: number;
    message: string;
    result: MeetData[];
}

interface Member {
    memberId: number;
    nickname: string;
    profileImage: string|null;
    phoneNumber: string|null;
    memberRole: string;
    email: string;
    payCount: number;
    payTotal: number;
}

interface MemberResponse {
    message: string;
    result: Member[];
    status: number;
}

interface DefaultResponse {
    status: number;
    message: string;
    result: null;
}

export type {
    Meet, MeetData, CreateMeetResponse, CreateMeetRequest, MeetInfoResponse, GetMyMeetsResponse,
    Member, MemberResponse,
    DefaultResponse
};