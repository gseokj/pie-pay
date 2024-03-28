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

export type { CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse };