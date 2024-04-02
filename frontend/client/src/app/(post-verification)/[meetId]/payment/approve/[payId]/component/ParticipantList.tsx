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
import { getMyInfo } from '@/util/getMyInfo';

type Props = {
  payId: number;
}
interface ParticipantSocketRes {
  payId:number;
  participantId:number;
  payAgree:'wait'|'deny'|'agree';
  payStatus: "OPEN" | "ING" | "COMPLETE" | "CLOSE";
}
export default function ParticipantList({ payId }: Props) {
  const myInfo = getMyInfo();
  const { payment, isLoading, updatePayment } = usePayment();
  const { instead ,res} = usePaymentSocket();
  const insteadPart = async (borrowerId: number, lenderId: number) => {

    instead(payId, borrowerId,lenderId );
  };

  useEffect(() => {
    if (!res) return;
    updatePayment({ ...res, payAgree: res.payAgree ? 'agree' : 'deny' });
  }, [res]);
  return (

    <div className={styles.participantContainer}>
      {isLoading &&
        <>
          <PulseMember />
          <PulseMember />
        </>
      }
      {payment && payment.participants.map((participant,index) => (

          <div key={participant.participantId}
               className={`${styles.container}  ${participant.payAgree==='agree' && styles.backgroundSkyBlue} ${participant.payAgree==='deny' && styles.backgroundLightRed}`}>
            <div className={styles.participantList}>
              <img className={styles.image} src={participant.memberInfo.profileImage} alt="" width={50} />
              {participant.memberInfo.memberId === myInfo.memberId ? <p>{`나 (${participant.memberInfo.nickname})`}</p> :
                <p>{participant.memberInfo.nickname}</p>}
            </div>
            <div className={styles.boxRight}>
              {/*대기중 상태*/}
              {participant.payAgree === 'wait' &&
                <div className={styles.paymentStatus.await}>
                  <p>준비 중...</p>
                  <ProgressSpiner />
                </div>
              }
              {/*승인 상태*/}
              {participant.payAgree === 'agree' &&
                <div className={styles.paymentStatus.agree}>
                  <p>승인</p>
                  <Image src={agree} alt="승인" />
                </div>}
              {/*도와줘(거부) 상태*/}
              {participant.payAgree === 'deny' &&
                <div className={styles.paymentStatus.deny}>
                  <p>도와줘!</p>
                  <button onClick={() => insteadPart(participant.memberInfo.memberId,payment?.participants[0].memberInfo.memberId)}><Image src={hand} alt="도와줘" />
                  </button>
                </div>}
            </div>
          </div>

        ),
      )}

    </div>
  );
}
