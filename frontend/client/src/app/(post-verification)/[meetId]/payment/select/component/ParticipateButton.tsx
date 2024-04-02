'use client'

import {useRouter} from "next/navigation";
import * as styles from "@/styles/payment/select/selectMember.css";
import {useMutation} from "@tanstack/react-query";
import axios from "axios";
import {useMemberFilter} from "@/store/useMemberFilter";
import { usePayment } from '@/store/usePayment';
import {getMyInfo} from "@/util/getMyInfo";
import {Payment} from "@/model/participant";



type Props={
    meetId: string
}

export default function ParticipateButton({ meetId }: Props) {
    const route = useRouter();
    const {filterMembers} = useMemberFilter();
    const token: string = "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzExNTAwMTQzLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfTk9UX0NFUlRJRklFRCJ9.hGZ4jBwzHS-qnjwhJtNA2UcxqiwAg4uVfIUhdv-RJzI";
    const {setPayment,payment} = usePayment();
    const { mutate } = useMutation({

        mutationFn: (id) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/pay/parties?meetId=${meetId}`, filterMembers.filter(member=>member.isSelected),
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              }}),
        onSuccess: (response) => {
            const res:Payment = response.data.result;
            res.participants.sort((member)=>member.memberInfo.memberId==getMyInfo().memberId ? -1 : 1)
            setPayment(res);

            route.replace(`approve/${res["payId"]}`);
        },
        onError: () => { console.error('에러 발생') },
        onSettled: () => { console.log('결과에 관계 없이 무언가 실행됨') }
    });

    return(
    <button onClick={()=>mutate()} className={styles.submitButton}>
        <div>알림 보내기</div>
    </button>
    )
}