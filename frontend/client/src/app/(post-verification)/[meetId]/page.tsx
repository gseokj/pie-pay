import {ReactNode} from "react";
import PaymentSelectButton from "@/app/(post-verification)/[meetId]/component/PaymentSelectButton";
import InviteMemberCard from "@/app/(post-verification)/[meetId]/component/InviteMemberCard";
import SelectMeetImageCard from "@/app/(post-verification)/[meetId]/component/SelectMeetImageCard";


const patchedMeetInfo: MeetInfo = {
    createdAt: "2024-03-19T15:43:57.3042142",
    updatedAt: "2024-03-20T15:43:57.3042142",
    id: 1,
    meetName: "SSAFY",
    meetImage: "",
    meetInvitation: "eb53ad",
    memberCount: 1
}

export interface MeetInfo {
    createdAt: string;
    updatedAt: string;
    id: number;
    meetName: string;
    meetImage: string;
    meetInvitation: string;
    memberCount?: number;
}


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function Meet({params}: Props) {
    const {meetId} = params;

    return (
        <>
            {patchedMeetInfo.memberCount == 1 ?
                <>
                    <InviteMemberCard meetInvitation={ patchedMeetInfo.meetInvitation } />
                    <SelectMeetImageCard />
                </>
                :
                <PaymentSelectButton meetId={ meetId } />
            }
        </>
    );
}
