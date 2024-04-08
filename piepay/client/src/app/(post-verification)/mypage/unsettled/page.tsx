"use client";


import {useEffect, useState} from "react";
import {getCookie} from "@/util/getCookie";
import {useQueryClient} from "@tanstack/react-query";
import {Debt} from "@/model/user/payments";
import UserDebtCard from "@/app/(post-verification)/mypage/component/new/UserDebtCard";
import {Me} from "@/model/member";
import UserDebtModal from "@/app/(post-verification)/mypage/component/new/UserDebtModal";
import {useStore} from "@/store/useMeetModalStore";
import UserDebtHistoryCard from "@/app/(post-verification)/mypage/component/new/UserDebtHistoryCard";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import {useRouter} from "next/navigation";

export default function Unsettled() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { isUserDebtModalOn} = useStore((state) => state);
    const [debts, setDebts] = useState<Debt[]>([]);
    const [user, setUser] = useState<Me>();
    const [unPayback, setUnPayback] = useState<number>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const token = getCookie('accessToken');
        const userDebts: Debt[]|undefined = queryClient.getQueryData(['userDebts', token]);
        const userInfo: Me|undefined = queryClient.getQueryData(['userInfo', token]);
        if (typeof userDebts !== 'undefined') {
            setDebts(sortDebt(userDebts));
            const unPaybackCount = userDebts?.reduce((acc, debt) => {
                if (!debt.payback) {
                    return acc + 1;
                }
                return acc;
            }, 0);
            setUnPayback(unPaybackCount);
        }
        if (typeof userInfo !== 'undefined') {
            setUser(userInfo);
        }

    }, [isUserDebtModalOn]);

    const sortDebt = (debts: Debt[]) => {
        const sortedDebts = debts.sort((a, b) => {
            if (a.payback !== b.payback) {
                return a.payback ? 1 : -1;
            }
            return b.createdAt.localeCompare(a.createdAt);
        })
        return sortedDebts;
    }

    const onClickBack = () => {
        router.back();
    }

    return (
        <>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>미정산 내역</h1>
            </header>
            {typeof user !== 'undefined' &&
                <UserDebtHistoryCard props={{debts, user}}/>
            }
            <div className={mainStyles.categoryContainer.default}>
                <h3 className={fontStyles.bold}>미정산 건수 {unPayback}</h3>
            </div>
            <section>
                {typeof user !== 'undefined' && debts.map((debt, index) => {
                    return <UserDebtCard props={{debt, user}}/>
                })}
            </section>
            <UserDebtModal/>
        </>
    );
}