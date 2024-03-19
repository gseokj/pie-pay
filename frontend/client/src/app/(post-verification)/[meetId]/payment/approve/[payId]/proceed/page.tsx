'use client'

import {getPayment} from "@/api/payment";
import BankAccount from "@/app/(post-verification)/component/BankAccount";

import two from "@/assets/icons/payment2.svg";
import Header from "@/app/(post-verification)/[meetId]/payment/component/Header";
import ParticipantList from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ParticipantList";

import Timer from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/Timer"
import React, {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import StateButton from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/StateButton";

type Props = {
    params: { payId: string },
}
export default function Page({params}:Props) {
    const {payId} = params;
    const { data: payment, isLoading, error } = useQuery({queryKey: ['payId',payId], queryFn: getPayment}) ;
    console.log(payment);

    return (<div>
        <Header type={two}/>
        <p className="text-2xl font-bold mb-3">결제 동의를 해 주세요</p>
        <Timer payId={payId}/>
        <BankAccount/>
        <p className="mt-4 text-gray-500">결제 멤버 {payment?.participants.length}</p>

        <ParticipantList payId={payId}/>
        <StateButton/>
    </div>);
}