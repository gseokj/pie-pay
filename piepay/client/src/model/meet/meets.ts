interface Meet {
    meetName: string;
    meetImage: string;
    meetId: number;
    membersCount: number;
    member: MeetMemberImage[];
    lastPayDate: string|null;
    createdAt: string|null;
    topFixed: boolean;
}

interface MeetMemberImage {
    profileImage: string;
}

export type {
    Meet, MeetMemberImage
}