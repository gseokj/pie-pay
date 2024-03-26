"use client";


import {ReactNode} from "react";
import PaymentSelectButton from "@/app/(post-verification)/[meetId]/component/PaymentSelectButton";
import InviteMemberCard from "@/app/(post-verification)/[meetId]/component/InviteMemberCard";
import SelectMeetImageCard from "@/app/(post-verification)/[meetId]/component/SelectMeetImageCard";
import MeetInfoCard from "@/app/(post-verification)/[meetId]/component/MeetInfoCard";
import {useQueryClient} from "@tanstack/react-query";
import {GetMeetInfoResponse} from "@/model/meet";
import MemberLayout from "@/app/(post-verification)/[meetId]/component/MemberLayout";
import PaymentLayout from "@/app/(post-verification)/[meetId]/component/PaymentLayout";
import HighlightLayout from "@/app/(post-verification)/[meetId]/component/HighlightLayout";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

const Dummy = {
    createdAt: "2024-03-18T13:56:38.630921",
    updatedAt: "2024-03-19T15:40:26.678456",
    id: 1,
    meetName: "DearEvanHansen",
    meetImage: "DearEvanHansen.com",
    meetInvitation: "a3dd25",
    meetMembers: 4
}


export default function Meet({params}: Props) {
    const {meetId} = params;
    const queryClient = useQueryClient();
    const meetInfo = queryClient.getQueryData(["meetInfo",meetId]) as GetMeetInfoResponse;

    return (
        <>
            <MeetInfoCard params={{ meetId }} />
            {meetInfo.result.meetImage !== null ?
                <>
                    <InviteMemberCard meetInvitation={ meetInfo.result.meetInvitation } />
                    <SelectMeetImageCard />
                </>
                :
                <>
                    <MemberLayout meetId={meetId} />
                    <PaymentLayout meetId={meetId} />
                    <HighlightLayout meetId={meetId} />
                    <PaymentSelectButton meetId={meetId}/>
                </>
            }
        </>
    );
}
