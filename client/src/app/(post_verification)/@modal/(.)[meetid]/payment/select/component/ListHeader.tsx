'use client'

import Image from "next/image";
import check from "@/assets/icons/check.svg";
import uncheck from "@/assets/icons/uncheck.svg";
import * as styles from "@/styles/payment/listHeader.css";
import {faker} from "@faker-js/faker";
import {useState} from "react";

const Members = [
    {id: 'elonmusk', nickname: '일론머', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'seokju', nickname: '석주', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'goseok', nickname: '응애', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'elonmusk', nickname: '스티브', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'seokju', nickname: '코일', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'goseok', nickname: '잡스', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'elonmusk', nickname: '준수', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
    {id: 'seokju', nickname: '기분', image: faker.image.avatar(), isPayment: true, isAlcohol: true},
]

export default function ListHeader() {
    const [isAlcohol, setIsAlcohol] = useState<boolean>(false);

    const onClickAlcohol = () =>{
        setIsAlcohol(!isAlcohol);
    }
    return (
        <div className={styles.container}>
            <div className={styles.totalMember}>멤버 {Members.length}</div>
            <div className={styles.member}>
                {isAlcohol && <button onClick={onClickAlcohol}><Image src={check} alt="" width={20} height={20}/></button>}
                {!isAlcohol && <button onClick={onClickAlcohol}><Image src={uncheck} alt="" width={20} height={20}/></button>}
                <button onClick={onClickAlcohol}><div className={styles.totalMember}>주류 포함</div></button>
            </div>
        </div>);
}