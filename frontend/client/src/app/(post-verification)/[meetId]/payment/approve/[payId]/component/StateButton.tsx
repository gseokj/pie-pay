'use client';

import React, { useState } from 'react';
import * as styles from '@/styles/payment/agree/stateButton.css';
import { useQuery } from '@tanstack/react-query';
import { getAccount } from '@/api/account';
import { usePayment } from '@/store/usePayment';
import { usePaymentSocket } from '@/store/usePaymentSocket';


type Props = {
  payId: number;
}
export default function StateButton({ payId }: Props) {

  const { payment } = usePayment();
  const { send } = usePaymentSocket();
  const handleClick = (payAgree: boolean) => {
    if (payment) send(payId, payment?.participants[0].participantId, payAgree);
  };
  return (
    <div className={styles.container}>

      <div className={styles.content}>
        <div className={styles.waitSection}>
          {payment && payment.participants.length>0 && payment?.participants[0].payAgree === 'wait' &&
            <button onClick={() => handleClick(false)} className={styles.button.beforeinstead}>대신 내
              주세요😥</button>}
          {payment && payment.participants.length>0 && payment?.participants[0].payAgree === 'wait' &&
            <button onClick={() => handleClick(true)} className={styles.button.beforeAgree}>승인하기</button>}
          {payment && payment.participants.length>0 && payment?.participants[0].payAgree === 'deny' &&
            <button onClick={() => handleClick(false)} className={styles.button.afterinstead}>도움 요청하기
              <p  className={styles.hand}>👋</p></button>}
        </div>
        <div className={styles.agreeSection}>
          {payment && payment.participants.length>0 && payment?.participants[0].payAgree === 'agree' &&
            <p className={styles.tip}> TIP : 멤버를 선택해서 대신 결제 할 수 있어요!</p>}
          {payment && payment.participants.length>0 && payment?.participants[0].payAgree === 'agree' && <button className={styles.button.afterAgree}>승인완료</button>}
        </div>
      </div>
    </div>);
}