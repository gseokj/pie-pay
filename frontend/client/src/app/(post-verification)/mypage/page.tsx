'use client';


import React from 'react';
import { useRouter } from 'next/navigation';
import UserInfoCard from "@/app/(post-verification)/mypage/component/new/UserInfoCard";
import AccountLayout from "@/app/(post-verification)/mypage/component/new/AccountLayout";
import UserPaymentLayout from "@/app/(post-verification)/mypage/component/new/UserPaymentLayout";
import UserDebtLayout from "@/app/(post-verification)/mypage/component/new/UserDebtLayout";


export default function MyPage() {
    const route = useRouter();

    return (
        <section>
            <UserInfoCard />
            <AccountLayout />
            <UserPaymentLayout />
            <UserDebtLayout />
        </section>
    );
}
