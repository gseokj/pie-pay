"use client";


import {ReactNode} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import MeetInfoCard from "@/app/(post-verification)/[meetId]/component/MeetInfoCard";
import {GetMeetInfoResponse} from "@/model/meet";
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


export default function Meet({params}: Props) {
    const token = getCookie('accessToken');
    const {meetId} = params;
    const queryClient = useQueryClient();
    const meetInfo: GetMeetInfoResponse | undefined = queryClient.getQueryData(['meetInfo', meetId, token]);
    console.log(meetInfo);

    if (typeof meetInfo !== 'undefined') {
        return (
          <>
              <>
                  <MeetInfoCard params={{ meetId }} />
                  {typeof meetInfo !== 'undefined' && meetInfo.result.membersCount === 1 ?
                    <>
                      {meetInfo.result.membersCount === 1 && <InviteMemberCard meetInvitation={ meetInfo.result.meetInvitation } />}
                      {meetInfo.result.meetImage === null && <SelectMeetImageCard />}
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
