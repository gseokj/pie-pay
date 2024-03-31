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
    membersCount: number;
}

interface GetMeetInfoResponse {
    message: string;
    result: Meet;
    status: number;
}

interface MeetData {
    meet: Meet;
    topFixed: boolean;
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
}

interface MemberResponse {
    message: string;
    result: Member[];
    status: number;
}

export type {
    Meet, MeetData, CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse, GetMyMeetsResponse,
    Member, MemberResponse
};