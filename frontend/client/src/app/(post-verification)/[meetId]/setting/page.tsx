import {ReactNode} from "react";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function MeetSetting({params}: Props) {
    const {meetId} = params;

    return (
        <h1>모임 관리</h1>
    );
}