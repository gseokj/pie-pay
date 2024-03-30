"use client";


import {ReactNode} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import MeetInfoCard from "@/app/(post-verification)/[meetId]/component/MeetInfoCard";
import {GetMeetInfoResponse, Meet} from "@/model/meet";
import InviteMemberCard from "@/app/(post-verification)/[meetId]/component/InviteMemberCard";
import SelectMeetImageCard from "@/app/(post-verification)/[meetId]/component/SelectMeetImageCard";
import MemberLayout from "@/app/(post-verification)/[meetId]/component/MemberLayout";
import PaymentLayout from "@/app/(post-verification)/[meetId]/component/PaymentLayout";
import HighlightLayout from "@/app/(post-verification)/[meetId]/component/HighlightLayout";
import PaymentSelectButton from "@/app/(post-verification)/[meetId]/component/PaymentSelectButton";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}


const dummy: Meet = {
    createdAt: '2012-11-26T13:51:50.417-07:00',
    updatedAt: '2012-01-26T13:51:50.417-07:00',
    meetId: 2,
    meetName: '갈까마귀모임',
    meetImage: null,
    meetInvitation: '7AB83Y',
    membersCount: 2,
}


export default function Meet({params}: Props) {
    const token = getCookie('accessToken');
    const {meetId} = params;
    const queryClient = useQueryClient();
    const meetInfo: GetMeetInfoResponse | undefined = queryClient.getQueryData(['meetInfo', meetId, token]);
    console.log(meetInfo);

    if (typeof dummy !== 'undefined') {
        return (
          <>
              <>
                  {typeof dummy !== 'undefined' && dummy.membersCount === 1 ?
                    <>
                      {dummy.membersCount === 1 && <InviteMemberCard meetInvitation={ dummy.meetInvitation } />}
                      {dummy.meetImage === null && <SelectMeetImageCard />}
                    </>
                    :
                    <>
                        <MeetInfoCard params={{ meetId }} />
                        <MemberLayout meetId={meetId} />
                        <PaymentLayout meetId={meetId} />
                        <HighlightLayout meetId={meetId} />
                        <PaymentSelectButton meetId={meetId}/>
                    </>
                  }
              </>
          </>
        );
    } else {
        return (
          <>
              모임 데이터를 불러올 수 없습니다
          </>
        );
    }
}
