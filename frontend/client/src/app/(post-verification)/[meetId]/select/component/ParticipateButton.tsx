'use client'

import {useRouter} from "next/navigation";
import * as styles from "@/styles/payment/select/selectMember.css";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from "axios";
import {useMemberFilter} from "@/store/useMemberFilter";
import { usePayment } from '@/store/usePayment';
import {Payment} from "@/model/participant";
import { LoaderComponent } from '@/app/component/Loading';
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';
import { Me } from '@/model/member';



type Props={
    meetId: string
}

export default function ParticipateButton({ meetId }: Props) {
    const route = useRouter();
    const {filterMembers} = useMemberFilter();
    const {setPayment,payment} = usePayment();
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = getCookie('accessToken') as string;
        setToken(token);
    }, []);
    const queryClient = useQueryClient();
    const myInfo: Me | undefined = queryClient.getQueryData(["userInfo",token]);

    const { mutate,isPending } = useMutation({

        mutationFn: (id) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/pay/parties?meetId=${meetId}`, filterMembers.filter(member=>member.isSelected),
          {
              headers: {
                  'Authorization': `Bearer ${token}`
              }}),
        onSuccess: (response) => {
            const res:Payment = response.data.result;
            res.participants.sort((member)=>member.memberInfo.memberId==myInfo?.memberId ? -1 : 1)
            setPayment(res);

            route.replace(`/payment/approve/${res["payId"]}`);
        },
        onError: () => { console.error('에러 발생') },
        onSettled: () => { console.log('결과에 관계 없이 무언가 실행됨') }
    });

    return(
      <>
          {isPending&& <LoaderComponent/>}
    <button onClick={()=>mutate()} className={styles.submitButton}>
        <div>알림 보내기</div>
    </button>
        </>
    )
}