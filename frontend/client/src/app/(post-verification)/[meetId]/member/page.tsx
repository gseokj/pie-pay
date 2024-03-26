import {ReactNode} from "react";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function Member({params}: Props) {
    const {meetId} = params;

    return (
        <h1>모임 멤버</h1>
    );
}