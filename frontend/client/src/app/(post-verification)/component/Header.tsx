'use client';

import * as styles from "@/styles/header.css";
import * as fontCss from "@/styles/fonts.css";
import theme from "@/styles/theme/theme";
import {usePathname} from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/icons/piepaylogo.svg"
import MeetingIcon from "./icons/MeetingIcon";
import NotificationIcon from "./icons/NotificationIcon";
import ProfileIcon from "./icons/ProfileIcon";
import bell from "@/assets/icons/bell.svg"
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';
import { useQueryClient } from '@tanstack/react-query';
import { Notification } from '@/model/notification';

export default function Header() {
    useEffect(() => {
        const token = getCookie('accessToken') as string;
        setToken(token);
    }, []);
    const path = usePathname();
    const [token, setToken] = useState('');
    const queryClient = useQueryClient();
    const notifications = queryClient.getQueryData<Notification[]>(["notification",token]);

    return (
        <div className={styles.container}>
            <Link href="/" className={styles.logoContainer}><Image className={styles.headerLogo} src={logo} priority={true} alt='logo'/></Link>
            <div className={styles.navigation}>
                <Link href="/" className={`${styles.buttonContainer} ${fontCss.semibold}`}
                      style={path === "/" ? { color: theme.blue } : { color: theme.blueGray }}>
                    <MeetingIcon color={path === "/" ? theme.blue : theme.blueGray} />
                    모임
                </Link>

                <Link href="/notification" className={`${styles.buttonContainer} ${styles.topProperty} ${fontCss.semibold}`}
                      style={path.includes('notification') ? { color: theme.blue } : { color: theme.blueGray }}>

                    {notifications && notifications.length >0 &&<span className={styles.unreadAlarm}></span>}
                    <NotificationIcon color={path.includes('notification') ? theme.blue : theme.blueGray} />
                    알림

                </Link>

                <Link href="/mypage" className={`${styles.buttonContainer} ${fontCss.semibold}`}
                      style={path.includes("mypage") ? { color: theme.blue } : { color: theme.blueGray }}>
                    <ProfileIcon color={path.includes("mypage") ? theme.blue : theme.blueGray} />
                    내 정보
                </Link>
            </div>
        </div>
    );
}
