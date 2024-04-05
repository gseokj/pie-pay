'use client'

import * as styles from '@/styles/store/store.css';
import XBackButton from '@/app/(store)/component/XBackButton';
import {  useQuery } from '@tanstack/react-query';
import { getStoreReceipt, postStoreReceipt } from '@/api/store';
import { getCookie } from '@/util/getCookie';
import CheckModal from '@/app/(store)/component/CheckModal';
import { useCheckModal } from '@/store/useCheckModal';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePaymentSocket } from '@/store/usePaymentSocket';
import { store } from '@mswjs/cookies';

type Props=
{
  params: {
    payId: string
  }
}
export default function Page({params}: Props) {
  const {payId} = params;
  const [token, setToken] = useState('');
  const router = useRouter();
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);
  const {isVisible,updateState}  = useCheckModal();
  const { data: receipt} = useQuery({queryKey: ['store',payId,token], queryFn: getStoreReceipt})


  // 소켓 초기값
  const { connect,client,disconnect,storeSend,res } = usePaymentSocket();
  // 소켓 연결
  useEffect(() => {
    connect(Number(payId));
    return () => {
      if(client) disconnect(client);
    };
  }, []);


  useEffect(() => {
    if (!res) return;
    console.log(res);
    // updatePayment({ ...res, payAgree: res.payAgree ? 'agree' : 'deny' });
  }, [res]);

  const handleReplace = ()=>{
    console.log(payId+"로 보냄");
    postStoreReceipt(payId,token).then(response=>{
      storeSend(Number(payId));
      router.replace('/');
    }).catch((error)=>{
      console.log(error);
    })

  }

  return (
    <>
      {receipt &&
      <div className="flex flex-col h-[100%] m-3">

        {isVisible && <CheckModal handleReplace={handleReplace}/>}
        <div>
          <XBackButton />
        </div>
        <div className={styles.content}>
          <p className={styles.paragraph}>{receipt.store?.storeName}</p>
          <ul className={styles.ul.store}>
            <li>{receipt.store?.address}</li>
            <li>{receipt.store?.phone}</li>
          </ul>
          <hr />
          <ul className={styles.ul.menu}>
            <li>메뉴명</li>
            <li>가격</li>
            <li>수량</li>
            <li>합계</li>
          </ul>
          <hr />
          {receipt?.newOrderMenusResponse?.map((menuItem, index) => (
            <ul key={index} className={styles.ul.menu}>
              <li>{menuItem.menu.menuName}</li>
              <li>{menuItem.menu.menuPrice}</li>
              <li>{menuItem.quantity}</li>
              <li>{menuItem.menu.menuPrice * menuItem.quantity}</li>
            </ul>
          ))}

          <hr />
          <ul className={styles.ul.menu}>
            <li />
            <li />
            <li />
            <li>{receipt?.totalAmount}</li>
          </ul>
        </div>
        <button onClick={updateState} className={styles.button}>결제하기</button>

      </div>}

    </>

  );
}