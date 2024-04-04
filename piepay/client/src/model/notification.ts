export interface Notification{
    notificationId: number;
    message: string;
    referenceId: number;
    memberId:number;
    createdAt: string;
    readOrNot: boolean;
    destinationId: number;
}
