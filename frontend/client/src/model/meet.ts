interface CreateMeetRequest {
    meetName: string;
}

interface Meet {
    createdAt: string;
    updatedAt: string;
    id: number;
    meetName: string;
    meetImage: string|null;
    meetInvitation: string;
}

interface CreateMeetResponse {
    message: string;
    reuslt: Meet;
    status: number;
}

interface GetMeetInfoResponse {
    message: string;
    reuslt: Meet;
    status: number;
}

export type { CreateMeetResponse, CreateMeetRequest, GetMeetInfoResponse };