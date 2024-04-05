"use client";



import {useEffect, useState} from "react";
import {getCookie} from "@/util/getCookie";
import {useQueryClient} from "@tanstack/react-query";
import {Debt} from "@/model/user/payments";
import UserDebtCard from "@/app/(post-verification)/mypage/component/new/UserDebtCard";
import {Me} from "@/model/member";

export default function Unsettled() {
    const queryClient = useQueryClient();
    const [debts, setDebts] = useState<Debt[]>([]);
    const [user, setUser] = useState<Me>();

    useEffect(() => {
        const token = getCookie('accessToken');
        const userDebts: Debt[]|undefined = queryClient.getQueryData(['userDebts', token]);
        const userInfo: Me|undefined = queryClient.getQueryData(['userInfo', token]);
        if (typeof userDebts !== 'undefined') {
            setDebts(userDebts);
        }
        if (typeof userInfo !== 'undefined') {
            setUser(userInfo);
        }
    }, []);

    return (
        <>
            {typeof user !== 'undefined' && debts.map((debt, index) => {
                return <UserDebtCard props={{ debt, user }} />
            })}
        </>
    );
}