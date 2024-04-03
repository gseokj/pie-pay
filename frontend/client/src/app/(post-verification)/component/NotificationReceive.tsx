'use client';

import * as styles from '@/styles/notification/notificationReceive.css';
import Image from 'next/image';
import withdraw from '@/assets/icons/withdraw.svg';
import deposit from '@/assets/icons/deposit.svg';
import instead from '@/assets/icons/instead.svg';
import noti from '@/assets/icons/notification.svg';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/ko';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from '@/util/getCookie';
import { useSSE } from '@/store/useSSE';
import { usePaymentSocket } from '@/store/usePaymentSocket';


dayjs.extend(relativeTime);
dayjs.locale('ko');
export default function NotificationReceive() {
  const route = useRouter();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [token, setToken] = useState('');
  const { setEventSource,  SSEnotification, eventSource} = useSSE();
  const {setInitiating} =  usePaymentSocket();
  useEffect(() => {
    if(!SSEnotification) return;
    setIsVisible(prevState => !prevState);
    setTimeout(() => setIsVisible(false), 3000);
    console.log(SSEnotification);
  }, [SSEnotification]);

  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setEventSource(token);
    setToken(token);
    return ()=>{
      if(eventSource) eventSource.close();
    }
  }, [token]);
  const handleReplace = () =>{
      if(!SSEnotification) return;
      if(SSEnotification.referenceId===1){

      }else if(SSEnotification.referenceId===2){
        setInitiating();
        route.replace(`/${5}/payment/approve/${SSEnotification.destinationId}`);
        setIsVisible(false);
      }else if(SSEnotification.referenceId===3){

      }else if(SSEnotification.referenceId===4){

      }

  }

  return (<div onClick={handleReplace} className={`${styles.container}  ${isVisible && styles.visible}`}>

    <div className={styles.content}>
      <div className={styles.title}>
        {SSEnotification?.referenceId === 1 && <><Image className="" src={withdraw} alt="결제"/><p>결제</p></>}
        {SSEnotification?.referenceId === 2 && <><Image src={deposit} alt="입금"/><p>입금</p></>}
        {SSEnotification?.referenceId === 3 && <><Image src={instead} alt="대신"/><p>대신 내주기</p></>}
        {SSEnotification?.referenceId === 4 && <><Image src={noti} alt=""/><p>결제 알림</p></>}
      </div>
      <p className={styles.paragraph}>지금</p>
    </div>
    <p>{SSEnotification?.message}</p>
  </div>);
}