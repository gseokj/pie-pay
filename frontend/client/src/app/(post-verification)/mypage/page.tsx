'use client'

import {faker} from "@faker-js/faker";
import React from "react";
import {useRouter} from "next/navigation";
import {getDate} from "@/util/dateFormat"
import * as styles from "@/styles/mypage/myPageMain.css"
import MyInfo from '@/app/(post-verification)/mypage/component/MyInfo';
import MyAccount from '@/app/(post-verification)/mypage/component/MyAccount';

const Borrower = {
    memberId: 5,
    profileImage: faker.image.avatar(),
    nickname: '속석주'
}
const UnsettledBox = {
    createAt: new Date().toString(),
    Borrower: Borrower,
}
const Meet = {
    meetId: 1,
    meetName: '갈까마귀모임',
    meetImage: faker.image.avatar()
}

const Receipt = {
    payId: 1,
    storeName: '(주) 뽕족 강남점',
    totalAmount: 40500
}
const Payment = {
    createAt: new Date().toString(),
    meet: Meet,
    receipt: Receipt
}





export default function MyPage() {
    const route =useRouter();
    return (
        <div className={styles.container}>
            <MyInfo/>
            <MyAccount/>
            <section>
                <div className="flex justify-between">
                    <p className="font-bold mb-2 text-lg">미정산 내역</p>
                    <button  onClick={()=>route.push("mypage/unsettled")} className="text-gray-500 text-xs">더 보기</button>
                </div>
                <div className="flex flex-col  h-[80%] justify-between p-4 bg-white rounded-xl shadow-xl">
                    <div className="flex">
                        <p className="mr-3 text-sm text-gray-500">{getDate(new Date(UnsettledBox.createAt))}</p>
                        <p className="text-red-600 text-sm">정산 미완료</p>
                    </div>
                    <div className="flex items-center">
                        <img className="w-[10%] rounded-full mr-3" src={UnsettledBox.Borrower.profileImage}/>
                        <p className="font-bold">{UnsettledBox.Borrower.nickname}님에게 받을 돈이 있어요</p>
                    </div>
                    <div className="flex justify-end w-[100%]">
                        <button className="bg-sky-300 rounded-2xl w-[30%] p-1">현금 정산</button>
                    </div>

                </div>
            </section>
            <section>
                <div className="flex justify-between mb-2">
                    <p className="font-bold text-lg">결제 내역</p>
                    <button onClick={()=>route.push("mypage/payment-list")} className="text-gray-500 text-xs">더 보기</button>
                </div>
                <div className="flex flex-col h-[100%] justify-between p-4 bg-white rounded-xl shadow-xl">
                    <div className="flex">
                        <p className="mr-3 text-sm text-gray-500">{getDate(new Date(Payment.createAt))}</p>
                        <p className="text-green-600 text-sm">정산 완료</p>
                    </div>
                    <div className="flex flex-col">
                        <p className="font-bold text-sm">{Payment.meet.meetName}</p>
                        <p className="font-bold text-lg">{Payment.receipt.storeName}</p>
                    </div>
                    <div className="flex justify-end w-[100%]">
                        <p className="text-lg font-bold">{Payment.receipt.totalAmount.toLocaleString()} 원</p>
                    </div>

                </div>
            </section>

        </div>);
}