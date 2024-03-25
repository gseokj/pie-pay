import {ReactNode} from "react";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function History({params}: Props) {
    const {meetId} = params;


    return (
        <h1>결제 내역</h1>
    );
}