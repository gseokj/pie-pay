"use client";


import {ReactNode} from "react";
import {faker} from "@faker-js/faker"
import PaymentSelectButton from "@/app/(post-verification)/[meetId]/component/PaymentSelectButton";
import InviteMemberCard from "@/app/(post-verification)/[meetId]/component/InviteMemberCard";
import SelectMeetImageCard from "@/app/(post-verification)/[meetId]/component/SelectMeetImageCard";
import MeetInfoCard from "@/app/(post-verification)/[meetId]/component/MeetInfoCard";
import {useQueryClient} from "@tanstack/react-query";
import {GetMeetInfoResponse} from "@/model/meet";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function Meet({params}: Props) {
    const {meetId} = params;
    const queryClient = useQueryClient();
    const meetInfo = queryClient.getQueryData(["meetInfo",meetId]) as GetMeetInfoResponse;

    return (
        <>
            {meetInfo.reuslt.meetImage == null ?
                <>
                    <InviteMemberCard meetInvitation={ meetInfo.reuslt.meetInvitation } />
                    <SelectMeetImageCard />
                </>
                :
                <>
                    <PaymentSelectButton meetId={ meetId } />
                </>
            }
        </>
    );
}
