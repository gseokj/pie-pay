'use client'

import * as styles from "@/styles/header.css"
import Image from "next/image";
import profile from "@/assets/icons/profile.svg"
import bell from "@/assets/icons/bell.svg"
import inRoom from "@/assets/icons/inRoom.svg"
import {useRouter} from "next/navigation";


export default function Header() {
    const router = useRouter();

    const onClickButton = (path:string) => {
        if(path==="main") router.replace("/");
        if(path==="alarm") router.push("/alarm");
        if(path==="mypage") router.push("/mypage/1");
        if(path==="meeting") router.push("/1");
    }
    return (
        <div className={styles.container}>
            <button type="button" onClick={()=>onClickButton("main")}>Logo</button>
            <div className={styles.navigation}>
                <button type="button" onClick={()=>onClickButton("meeting")}><Image src={inRoom} width={24} height={24} alt='button'/></button>
                <button type="button" onClick={()=>onClickButton("alarm")}><Image src={bell} width={24} height={24} alt='button'/></button>
                <button type="button" onClick={()=>onClickButton("mypage")}><Image src={profile} width={24} height={24} alt='button'/></button>
            </div>
        </div>

    );
}