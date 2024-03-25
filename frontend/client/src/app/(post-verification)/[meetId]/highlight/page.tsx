import {ReactNode} from "react";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function Highlight({params}: Props) {
    const {meetId} = params;


    return (
        <h1>하이라이트</h1>
    );
}