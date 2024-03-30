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

interface MeetInMeets {
    meet: Meet;
    topFixed: boolean;
}

interface GetMyMeetsResponse {
    status: number;
    message: string;
    result: MeetInMeets[];
}

export type { Meet, CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse, GetMyMeetsResponse };