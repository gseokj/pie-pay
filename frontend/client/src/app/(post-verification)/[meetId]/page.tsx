import {ReactNode} from "react";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}


export default function Meet({params}: Props) {
    const {meetId} = params;

    return (
        <>
            {/*<MeetInfoCard params={{ meetId }} />*/}
            {/*{meetInfo.result.meetImage !== null ?*/}
            {/*    <>*/}
            {/*        <InviteMemberCard meetInvitation={ meetInfo.result.meetInvitation } />*/}
            {/*        <SelectMeetImageCard />*/}
            {/*    </>*/}
            {/*    :*/}
            {/*    <>*/}
            {/*        <MemberLayout meetId={meetId} />*/}
            {/*        <PaymentLayout meetId={meetId} />*/}
            {/*        <HighlightLayout meetId={meetId} />*/}
            {/*        <PaymentSelectButton meetId={meetId}/>*/}
            {/*    </>*/}
            {/*}*/}
        </>
    );
}
