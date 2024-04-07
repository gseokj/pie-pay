'use client';

import Header from '@/app/(post-verification)/[meetId]/payment/component/Header';
import three from '@/assets/icons/payment3.svg';
import * as styles from '@/styles/payment/result/result.css';
import ParticipantResultList
  from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ParticipantResultList';
import ReceiptBox from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ReceiptBox';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import { getPaymentResult } from '@/api/payment';
import ReceiptModal from '@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ReceiptModal';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';
import { getReceipt } from '@/api/receipt';
import { usePaymentResult } from '@/store/usePaymentResult';
import { useReceipt } from '@/store/useReceipt';
import {Me} from "@/model/member";
import {Account} from "@/model/account";

type Props = { params: { payId: string } }
export default function Page({ params }: Props) {
  const { setPaymentResult } = usePaymentResult();
  const { setReceipt } = useReceipt();
  const router = useRouter();
  const { payId } = params;
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);

  const [myPaid, setMyPaid] = useState<number>();

  const { data: receipt } = useQuery({ queryKey: ['receipt', Number(payId), token], queryFn: getReceipt });
  const { data: paymentResult } = useQuery({
    queryKey: ['paymentResult', Number(payId), token],
    queryFn: getPaymentResult,
  });

  const queryClient = useQueryClient();
  const myInfo: Me|undefined = queryClient.getQueryData(['userInfo', token]);

  useEffect(() => {
    if(!receipt || !paymentResult || typeof myInfo === 'undefined') return;
    setReceipt(receipt);
    setPaymentResult(paymentResult);
    const me = paymentResult.participants.find((participant) => participant.memberInfo.nickname === myInfo.nickname);
    if (typeof me !== 'undefined') {
      queryClient.setQueryData(['account', token], (oldData: Account[]) => {
        const newData = oldData.map((data) => {
          return {
            ...data,
            balance: (Number(data.balance) - me.payAmount).toString()
          }
        });
        return newData;
      });
    }
  }, [receipt,paymentResult]);


  return (<>
    <ReceiptModal payId={Number(payId)} />
    <Header type={three} />
    <p className={styles.pargraph.title}>결제가 완료됐어요</p>
    <ReceiptBox payId={Number(payId)} />

    <ParticipantResultList payId={Number(payId)} />

    <button onClick={() => router.replace('/')} className={styles.submitButton}>확인</button>

  </>);
}