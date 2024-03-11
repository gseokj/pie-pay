'use client'

import * as styles from "@/styles/payment/memberList.css";
import check from "@/assets/icons/check.svg";
import uncheck from "@/assets/icons/uncheck.svg";
import Image from "next/image";

interface Props {
    memberId: number;
    nickname: string;
    profileImage: string;
    payAgree: boolean;
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
    onCheck: (memberId:number)=>void;
}
export default function MemberList({memberId,nickname,profileImage,payAgree,isDrinkAlcohol,isTypeAlcohol,onCheck}:Props) {
    const onClickCheck = () => {
        onCheck(memberId);
    }

    return (
        <div>
            <div className={styles.memberContent}> 
                <div className={styles.memberList}>
                    <img className={styles.image} src={profileImage} alt="" width={50}/>
                    <p className={styles.memberName}>{nickname}</p>
                </div>
                {payAgree && <button onClick={onClickCheck}><Image className={styles.checkbox} src={check} alt="check"/></button>}
                {!payAgree && <button onClick={onClickCheck}><Image className={styles.checkbox} src={uncheck} alt="uncheck"/></button>}
            </div>
        </div>)
}
