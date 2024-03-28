interface CreateMeetRequest {
    meetName: string;
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

interface CreateMeetResponse {
    message: string;
    result: Meet;
    status: number;
}

interface GetMeetInfoResponse {
    message: string;
    result: Meet;
    status: number;
}

interface MeetInMeets {
    meet: Meet;
    memberCount: number;
    topFixed: boolean;
}

interface GetMyMeetsResponse {
    status: number;
    message: string;
    result: MeetInMeets[];
}

export type { CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse };