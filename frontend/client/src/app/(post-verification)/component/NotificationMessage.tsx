'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import * as styles from "@/styles/notification/notificationMessage.css"
import { useNotification } from '@/store/useNotification';
import { getCookie } from '@/util/getCookie';
import { useEffect } from 'react';
import {Notification} from "@/model/notification"

dayjs.extend(relativeTime);
dayjs.locale('ko')

export default function NotificationMessage() {
    const queryClient = useQueryClient();
    const queryNotification= queryClient.getQueryData<Notification[]>(["notification",getCookie('accessToken')]);
    const {notifications,setNotification,initNotification}= useNotification();
    useEffect(() => {
        if(!queryNotification) return;
        initNotification(queryNotification);
    }, [queryNotification]);
    return (
        <div className={styles.container}>
            {notifications?.map((notifications) => (
                <div className={styles.box}>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            {/*{notifications.type === "withdraw" && <><Image className="" src={withdraw} alt="결제"/><p>결제</p></>}*/}
                            {/*{notifications.type === "deposit" && <><Image src={deposit} alt="입금"/><p>입금</p></>}*/}
                            {/*{notifications.type === "instead" && <><Image src={instead} alt="대신"/><p>대신 내주기</p></>}*/}
                            {/*{notifications.type === "notifications" && <><Image src={noti} alt=""/><p>결제 알림</p></>}*/}
                        </div>
                        <p className={styles.paragraph}>{dayjs(notifications.createdAt).fromNow()}</p>
                    </div>
                    <p>{notifications.message}</p>

                </div>))}
        </div>
    );
}