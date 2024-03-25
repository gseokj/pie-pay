"use client";


import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";
import PaymentCard from "@/app/(post-verification)/[meetId]/component/PaymentCard";
import {useEffect, useState} from "react";


export interface PaymentHistory {
    paymentId: number;
    createdAt: string;
    storeName: string;
    meetName: string;
    totalMoney: number;
    isClear: boolean;
}


const paymentHistory: PaymentHistory[] = [
    {
        paymentId: 1,
        createdAt: "2024-03-20T13:56:38.630921",
        storeName: "(주) 뽕족 강남역본점",
        meetName: "어쩌구 모임",
        totalMoney: 95000,
        isClear: true
    }
];


interface PaymentProps {
    meetId: string;
}

export default function PaymentLayout({ meetId }: PaymentProps) {
    const route = useRouter();

    const onClickPush = () => {
        route.push(`/${meetId}/history`);
    }

    return (
        <section>
            <div className={mainStyles.categoryContainer}>
                <h3 className={fontStyles.bold}>결제 내역</h3>
                <button
                    className={fontStyles.bold}
                    onClick={onClickPush}
                >더보기</button>
            </div>
            <PaymentCard props={paymentHistory[0]} />
        </section>
    );
}