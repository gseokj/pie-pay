import dayjs from "dayjs";


export const compareTime = (time: string): string => {
    const now = dayjs();
    const targetTime = dayjs(time);
    const diffInMinutes = now.diff(targetTime, 'minute');
    const diffInHours = now.diff(targetTime, 'hour');
    const diffInDays = now.diff(targetTime, 'day');

    if (diffInMinutes < 1) {
        return '방금 전';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    } else if (diffInDays < 2) {
        return '어제';
    } else {
        return `${diffInDays}일 전`;
    }
}