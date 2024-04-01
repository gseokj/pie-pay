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
import {getMyInfo} from "@/util/getMyInfo";
import { useRouter } from 'next/navigation';

type Props = { payId: number }


export default function Open({payId}:Props) {

    const { connect } = usePaymentSocket();
    const queryClient = useQueryClient();

    // tanstack query
    const payment: Payment | undefined = queryClient.getQueryData(['payment', payId]);

    // zustand
    // zustand와 tanstack을 동시에 관리하는 이유 => socket을 바로 post로 보내는게 아니라 결제 동의가 이루어지지 않으면 post가 되지않음.
    const { payment: tempPayment, setPayment } = usePayment();

    // 소켓 초기값
    const { init, initRes, initiating } = usePaymentSocket();

    useEffect(() => {
        const myInfo =getMyInfo();

        let res: Payment | null;
        // 만약 방 개설자 아니다 || 방 개설자지만 나갔다가 들어왔다면  => 서버에서 불러온 payment를 넣어주는 과정
        // 이 과정은 POST를 보낸 유저는 바로 화면에 띄어주는 차별성을 위한 코드임.
        if (!initRes || !payment) return;
        const { agreeTrue, agreeFalse } = initRes;
        res = {
            ...payment,
            participants: payment.participants.map(participant => {
                if (agreeTrue.includes(participant.participantId)) {
                    return {
                        ...participant,
                        payAgree: 'agree',
                    };
                } else if (agreeFalse.includes(participant.participantId)) {
                    return {
                        ...participant,
                        payAgree: 'deny',
                    };
                } else {
                    return {
                        ...participant,
                        payAgree: 'wait',
                    };
                }
            }),
        };
        if (!initRes) {

        }
        console.log(res);
        setPayment(res);
    }, [payment, initRes]);

    // 소켓 연결
    useEffect(() => {
        connect(Number(payId));
    }, []);

    // Init 소켓 초기값 설정
    useEffect(() => {
        if (!initiating) return;
        init(Number(payId));
    }, [initiating]);

    return (<div>

        <Header type={two} />
        <p className={styles.paragraph.title}>결제 동의를 해 주세요</p>
        <Timer payId={payId} />
        <BankAccount />
        <p className={styles.paragraph.total}>결제 멤버 {payment?.participants.length}</p>

        <ParticipantList payId={Number(payId)} />

        <StateButton payId={Number(payId)} />
    </div>);
}