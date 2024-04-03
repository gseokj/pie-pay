'use client';

import * as styles from '@/styles/payment/result/participantResultList.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Participant, Payment, PaymentResult } from '@/model/participant';
import hand from '@/assets/icons/hand.svg';
import resultbeer from '@/assets/icons/resultbeer.svg';
import resultprofile from '@/assets/icons/resultprofile.svg';
import Image from 'next/image';
import { getPayment, getPaymentResult } from '@/api/payment';
import { Receipt } from '@/model/receipt';
import { getCookie } from '@/util/getCookie';
import { usePaymentResult } from '@/store/usePaymentResult';

type Props = {
  payId: number;
}
export default function ParticipantResultList({ payId }: Props) {
  const {paymentResult,isLoading} =usePaymentResult();

  return (

    <div className={styles.participantContainer}>

      <p className={styles.pargraph.paymentMember}>결제 멤버 {paymentResult?.participants.length}</p>
      {paymentResult?.participants.map((participant) => (
          <div key={participant.participantId}
               className={`${styles.container}  ${paymentResult?.payInsteadList.map(instead => instead.lenderId).includes(participant.memberInfo.memberId) && styles.backgroundSkyBlue} ${paymentResult?.payInsteadList.map(instead => instead.borrowerId).includes(participant.memberInfo.memberId) && styles.backgroundLightRed}`}>
            <div className={styles.participantList}>
              <img className={styles.image} src={participant.memberInfo.profileImage} alt="" width={50} />
              <p>{participant.memberInfo.nickname}</p>
              {paymentResult?.payInsteadList.map(instead => instead.lenderId).includes(participant.memberInfo.memberId) &&
                <Image src={resultprofile} alt="" />}
              {paymentResult?.payInsteadList.map(instead => instead.borrowerId).includes(participant.memberInfo.memberId) &&
                <Image src={hand} alt="" />}
              {participant.isDrinkAlcohol && <Image src={resultbeer} alt="" />}

            </div>
            <p className={styles.pargraph.balance}>
              {participant.payAmount ? participant.payAmount.toLocaleString() + ' 원' : '0 원'}
            </p>
          </div>

        ),
      )}
    </div>
  );
}
