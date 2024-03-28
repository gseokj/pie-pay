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
    if(payment) send(payId,payment?.participants[0].participantId,payAgree);
  };
  return (
    <div className={styles.container}>
      {payment?.participants[0].payAgree === true && <p className={styles.tip}> TIP : 멤버를 선택해서 대신 결제 할 수 있어요!</p>}
      <div className={styles.content}>

        {payment?.participants[0].payAgree === undefined &&
          <button onClick={() => handleClick(false)} className={styles.button.beforeinstead}>대신 내
            주세요😥</button>}
        {payment?.participants[0].payAgree === undefined &&
          <button onClick={() => handleClick(true)} className={styles.button.beforeAgree}>승인하기</button>}
        {payment?.participants[0].payAgree === false &&
          <button className={styles.button.afterinstead}>도움 요청하기👋</button>}

        {payment?.participants[0].payAgree === true && <button className={styles.button.afterAgree}>승인완료</button>}
      </div>
    </div>);
}