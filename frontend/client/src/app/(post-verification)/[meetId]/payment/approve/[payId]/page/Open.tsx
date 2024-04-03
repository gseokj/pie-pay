'use client';

import BankAccount from '@/app/(post-verification)/component/BankAccount';
import two from '@/assets/icons/payment2.svg';
import Header from '@/app/(post-verification)/[meetId]/payment/component/Header';
import ParticipantList from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ParticipantList';
import Timer from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/Timer';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import StateButton from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/StateButton';
import * as styles from '@/styles/payment/proceed/proceedmain.css';
import { usePaymentSocket } from '@/store/usePaymentSocket';
import { usePayment } from '@/store/usePayment';
import { Payment } from '@/model/participant';
import { getCookie } from '@/util/getCookie';
import { Me } from '@/model/member';
import { hands, moveDownAnimation } from '@/app/component/DownAnimation';

type Props = { payId: number }


export default function Open({ payId }: Props) {
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, [token]);

  const queryClient = useQueryClient();
  const [stack, setStack] = useState(0);

  // tanstack query
  const payment: Payment | undefined = queryClient.getQueryData(['payment', payId,token]);

  // zustand와 tanstack을 동시에 관리하는 이유 => socket을 바로 post로 보내는게 아니라 결제 동의가 이루어지지 않으면 post가 되지않음.
  const { payment: tempPayment, setPayment } = usePayment();

  // 소켓 초기값
  const { init, initRes, initiating, connect, setInitiating,res,client,disconnect } = usePaymentSocket();


  useEffect(() => {
    const myInfo: Me | undefined = queryClient.getQueryData(['userInfo', token]);
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
    const sortedParticipants = res.participants.sort((member) => member.memberInfo.memberId === myInfo?.memberId ? -1 : 1);
    const payRes: Payment = {
      ...res,
      participants: sortedParticipants,
    };
    setPayment(payRes);
  }, [payment, initRes]);

  // 소켓 연결
  useEffect(() => {
    connect(Number(payId));
    return () => {
      setInitiating();
      if(client) disconnect(client);
    };
  }, []);

  // Init 소켓 초기값 설정
  useEffect(() => {
    console.log(initiating);
    if (!initiating) return;
    init(Number(payId));
    return () => {
      setInitiating();
    };
  }, [initiating]);
  useEffect(() => {
    if (!res) return;
    if(res.payAgree===false){
      setStack(prevState => prevState+1);
    }
  }, [res]);
  return (<div>

    <Header type={two} />
    <p className={styles.paragraph.title}>결제 동의를 해 주세요</p>
    <Timer payId={payId} />
    <BankAccount />
    <p className={styles.paragraph.total}>결제 멤버 {payment?.participants.length}</p>
    {Array.from({ length: stack }).map((_, index) => (
      <div key={index}>
        <style>{moveDownAnimation}</style>
        {hands}
      </div>
    ))}
    <ParticipantList payId={Number(payId)} />

    <StateButton payId={Number(payId)} />
  </div>);
}