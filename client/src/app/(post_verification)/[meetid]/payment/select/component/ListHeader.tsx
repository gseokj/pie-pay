'use client'

import Image from "next/image";
import check from "@/assets/icons/check.svg";
import uncheck from "@/assets/icons/uncheck.svg";
import * as styles from "@/styles/payment/select/listHeader.css";


interface Props{
    total: number;
    isAlcohol: boolean;
    onType: (isAlcohol:boolean)=>void;
}
export default function ListHeader({total,isAlcohol,onType}:Props) {
    return (
        <div className={styles.container}>
            <div className={styles.totalMember}>멤버 {total}</div>
            <div className={styles.member}>
                {isAlcohol && <button onClick={()=>onType(isAlcohol)}><Image src={check} alt="" width={20} height={20}/></button>}
                {!isAlcohol && <button onClick={()=>onType(isAlcohol)}><Image src={uncheck} alt="" width={20} height={20}/></button>}
                <button onClick={()=>onType(isAlcohol)}><div className={styles.totalMember}>주류 포함</div></button>
            </div>
        </div>);
}