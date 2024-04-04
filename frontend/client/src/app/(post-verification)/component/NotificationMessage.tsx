'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import * as styles from "@/styles/notification/notificationMessage.css"
import { getCookie } from '@/util/getCookie';
import { useEffect, useState } from 'react';
import {Notification} from "@/model/notification"
import withdraw from '@/assets/icons/withdraw.svg';
import inroom from '@/assets/icons/inRoom.svg';
import instead from '@/assets/icons/instead.svg';
import noti from '@/assets/icons/notification.svg';
import Image from 'next/image';
dayjs.extend(relativeTime);
dayjs.locale('ko')

export default function NotificationMessage() {
    // 쿠키
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = getCookie('accessToken') as string;
        setToken(token);
    }, [token]);


    const queryClient = useQueryClient();
    const queryNotification= queryClient.getQueryData<Notification[]>(["notification",token]);



    return (
        <div className={styles.container}>
            {queryNotification?.map((queryNotification:Notification) => (
                <div className={styles.box}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            {queryNotification.referenceId === 1 && <><Image src={withdraw} alt="결제"/><p>결제</p></>}
                            {queryNotification.referenceId === 2 && <><Image width={22} height={22} src={inroom} alt="참여"/><p>참여</p></>}
                            {queryNotification.referenceId === 3 && <><Image src={instead} alt="대신"/><p>대신 내주기</p></>}
                            {queryNotification.referenceId === 4 && <><Image src={noti} alt=""/><p>결제 알림</p></>}
                        </div>
                        <p className={styles.paragraph}>{dayjs(queryNotification.createdAt).fromNow()}</p>
                    </div>
                    <p>{queryNotification.message}</p>

                </div>))}
        </div>
    );
}