'use client'

import * as styles from "@/styles/header.css"
import Image from "next/image";
import {useRouter} from "next/navigation";
import logo from "@/assets/icons/piepaylogo.svg"
import MeetingIcon from "./MeetingIcon";
import NotificationIcon from "./NotificationIcon";
import ProfileIcon from "./ProfileIcon";
import theme from "@/styles/theme/theme";
import {useEffect, useState} from "react";


export default function Header() {
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(location.pathname)
    }, [location.pathname]);

    const onClickButton = (path:string) => {
        if(path==="main") router.replace("/");
        if(path==="alarm") router.push("/alarm");
        if(path==="mypage") router.push("/mypage/1");
        if(path==="meeting") router.push("/1");
    }
    return (
        <div className={styles.container}>
            <button type="button" onClick={()=>onClickButton("main")}><Image className={styles.headerLogo} src={logo} alt='logo'/></button>
            <div className={styles.navigation}>
                <button className={styles.buttonContainer} type="button" onClick={()=>onClickButton("main")}><MeetingIcon color={ currentPath === "/" ? theme.blue : theme.blueGray} />모임</button>
                <button className={styles.buttonContainer} type="button" onClick={()=>onClickButton("alarm")}><NotificationIcon color={ currentPath.includes("alarm") ? theme.blue : theme.blueGray} />알림</button>
                <button className={styles.buttonContainer} type="button" onClick={()=>onClickButton("mypage")}><ProfileIcon color={ currentPath.includes("mypage") ? theme.blue : theme.blueGray} />내 정보</button>
            </div>
        </div>
    );
}
