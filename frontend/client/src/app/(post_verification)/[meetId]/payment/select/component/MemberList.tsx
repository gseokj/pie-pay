'use client'

import * as styles from "@/styles/payment/select/memberList.css";
import check from "@/assets/icons/check.svg";
import uncheck from "@/assets/icons/uncheck.svg";
import checkBeer from "@/assets/icons/checkbeer.svg"
import uncheckBeer from "@/assets/icons/uncheckbeer.svg"
import Image from "next/image";

interface Props {
    memberId: number;
    nickname: string;
    profileImage: string;
    payAgree: boolean;
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
    onCheck: (memberId: number) => void;
    onCheckAlcohol: (memberId:number) => void;
    isHost: boolean;
}

export default function MemberList({memberId,nickname,profileImage, payAgree, isDrinkAlcohol, isTypeAlcohol, onCheck, onCheckAlcohol,isHost}: Props) {
    const localHandleCheck = () =>{
        if(isHost) {
            alert("나는 방장이다");
            return;
        }
        onCheck(memberId);
    }
    return (
        <div
            className={`${styles.container}  ${payAgree && styles.backgroundSkyBlue}`}>
            <div className={styles.memberList}>
                <img className={styles.image} src={profileImage} alt="" width={50}/>
                <p className={styles.memberName}>
                    {isHost && `나 (${nickname})`}
                    {!isHost && nickname}
                </p>
            </div>
            <button onClick={localHandleCheck}>
                {payAgree && !isTypeAlcohol &&
                    <Image className={styles.checkbox} src={check} alt="check"/>
                }
                {!payAgree &&
                    <Image className={styles.checkbox} src={uncheck} alt="uncheck"/>
                }
            </button>
            <button onClick={()=>onCheckAlcohol(memberId)} className={styles.checkboxContainer}>
                {payAgree && isTypeAlcohol && isDrinkAlcohol &&
                    <Image className={styles.checkbox} src={checkBeer} alt="uncheck"/>
                }
                {payAgree && isTypeAlcohol && !isDrinkAlcohol &&
                    <Image className={styles.checkbox} src={uncheckBeer} alt="uncheck"/>
                }

            </button>


        </div>
    )
}
