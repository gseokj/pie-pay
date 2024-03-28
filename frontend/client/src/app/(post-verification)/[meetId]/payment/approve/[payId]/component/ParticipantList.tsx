'use client';

import * as styles from '@/styles/payment/agree/participantList.css';
import ProgressSpiner from '@/app/(post-verification)/component/ProgressSpiner';
import { usePaymentSocket } from '@/store/usePaymentSocket';
import { usePayment } from '@/store/usePayment';
import PulseMember from '@/app/(post-verification)/[meetId]/payment/component/PulseMember';
import { useEffect } from 'react';
import hand from '@/assets/icons/hand.svg';
import agree from '@/assets/icons/agree.svg';
import Image from 'next/image';

type Props = {
  payId: number;
}
export default function ParticipantList({ payId }: Props) {
  const { payment, isLoading, updatePayment } = usePayment();

  const { send, res, init } = usePaymentSocket();

  const insteadPart = async (participantId: number, payAgree: boolean) => {
    console.log(participantId);
    send(payId, participantId, payAgree);
  };

  useEffect(() => {
    if (!res) return;

    updatePayment(res);
  }, [res]);

  return (

    <div className={styles.participantContainer}>
      {isLoading &&
        <>
          <PulseMember />
          <PulseMember />
        </>
      }
      <button onClick={() => init(Number(payId))}>init</button>
      {payment && payment.participants.map(participant => (

          <div key={participant.participantId}
               className={`${styles.container}  ${participant.payAgree && styles.backgroundSkyBlue} ${participant.payAgree == false && styles.backgroundLightRed}`}>
            <div className={styles.participantList}>
              <img className={styles.image} src={participant.memberInfo.profileImage} alt="" width={50} />
              <p>{participant.memberInfo.nickname}</p>
            </div>
            <div className={styles.boxRight}>
              {/*대기중 상태*/}
              {participant.payAgree == undefined &&
                <div className={styles.paymentStatus.await}>
                  <p>준비 중</p>
                <ProgressSpiner />
                </div>
                }
              {/*승인 상태*/}
              {participant.payAgree &&
                <div className={styles.paymentStatus.agree}>
                  <p>승인</p>
                  <Image src={agree} alt="승인" />
                </div>}
              {/*도와줘(거부) 상태*/}
              {participant.payAgree == false &&
                <div className={styles.paymentStatus.deny}>
                  <p>도와줘</p>
                  <button onClick={() => insteadPart(participant.participantId, true)}><Image src={hand} alt="도와줘" />
                  </button>
                </div>}
            </div>
          </div>

        ),
      )}

    </div>
  );
}
