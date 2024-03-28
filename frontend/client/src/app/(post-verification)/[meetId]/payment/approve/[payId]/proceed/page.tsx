'use client'

import BankAccount from "@/app/(post-verification)/component/BankAccount";
import two from "@/assets/icons/payment2.svg";
import Header from "@/app/(post-verification)/[meetId]/payment/component/Header";
import ParticipantList from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ParticipantList";
import Timer from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/Timer"
import React, {useEffect} from "react";
import { useQueryClient } from '@tanstack/react-query';
import StateButton from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/StateButton";
import * as styles from "@/styles/payment/proceed/proceedmain.css"
import { usePaymentSocket } from '@/store/usePaymentSocket';
import { usePayment } from '@/store/usePayment';
import { Payment } from '@/model/participant';

type Props = {
    params: { payId: string },
}

export default function Page({params}:Props) {
    const {payId} = params;
    const {connect} = usePaymentSocket();
    const queryClient = useQueryClient();

    // tanstack 쿼리를 불러오는 내용
    const payment: Payment | undefined = queryClient.getQueryData(["payment",payId]);
    const {payment:tempPayment, setPayment} = usePayment();


    useEffect(() => {
        // 만약 방 개설자 아니다 || 방 개설자지만 나갔다가 들어왔다면  => 서버에서 불러온 payment를 넣어주는 과정
        if(!tempPayment && payment) setPayment(payment);
    }, [payment]);

    // 소켓 연결
    useEffect(() => {
        connect(Number(payId));
    }, []);


    return (<div>
        <Header type={two}/>
        <p className={styles.paragraph.title}>결제 동의를 해 주세요</p>
        <Timer payId={payId}/>
        <BankAccount/>
        <p className={styles.paragraph.total}>결제 멤버 {payment?.participants.length}</p>

        <ParticipantList payId={Number(payId)}/>

        <StateButton payId={Number(payId)}/>
    </div>);
}