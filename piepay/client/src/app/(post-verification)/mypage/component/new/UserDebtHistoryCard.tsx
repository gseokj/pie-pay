"use client";

import {Debt} from "@/model/user/payments";
import {useEffect, useState} from "react";
import {Me} from "@/model/member";
import {useStore} from "@/store/useMeetModalStore";
import * as fontStyles from "@/styles/fonts.css";
import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as debtStyles from "@/styles/mypage/debt/layout.css";
import Image from "next/image";
import {main} from "@popperjs/core";

interface DebtHistoryProps {
    props: {
        debts: Debt[],
        user: Me
    }
}

export default function UserDebtHistoryCard({ props }: DebtHistoryProps) {
    const { debts, user } = props;
    const { isUserDebtModalOn} = useStore((state) => state);

    const [totalPaid, setTotalPaid] = useState<number>(0);
    const [totalPaidMembers, setTotalPaidMembers] = useState<string[]>([])
    const [totalReceived, setTotalReceived] = useState<number>(0);
    const [totalReceivedMembers, setTotalReceivedMembers] = useState<string[]>([])

    useEffect(() => {
        const paidMembers: string[] = [];
        const receivedMembers: string[] = [];
        const totalDebts = debts.reduce((acc, debt) => {
            if (debt.borrowerName === user.nickname && debt.payback) {
                if (typeof receivedMembers.find(item => item === debt.lenderProfile) === 'undefined') {
                    receivedMembers.push(debt.lenderProfile);
                }
                return { ...acc, received: acc.received + debt.amount };
            }
            if (debt.lenderName === user.nickname && debt.payback) {
                if (typeof paidMembers.find(item => item === debt.borrowerProfile) === 'undefined') {
                    paidMembers.push(debt.borrowerProfile);
                }
                return { ...acc, paid: acc.paid + debt.amount };
            }
            return acc;
        }, { paid: 0, received: 0 });

        setTotalPaid(totalDebts.paid);
        setTotalReceived(totalDebts.received);
        setTotalPaidMembers(paidMembers);
        setTotalReceivedMembers(receivedMembers);
    }, [isUserDebtModalOn]);

    return (
        <article className={debtStyles.totalDebtsContainer}>
            <div className={debtStyles.totalDebtsItem}>
                <p>대신 내준 금액</p>
                <h3 className={fontStyles.bold}>{totalPaid.toLocaleString('ko-kr')} 원</h3>
                <div className={debtStyles.profileContainer}>
                    {totalPaidMembers.map((profile: string, index) => {
                        return (
                            <div className={`${mainStyles.imageBox.imageBox24} ${debtStyles.inlineBlock}`} key={index}>
                                <Image src={profile} alt="member profile" fill={true} objectFit="cover" sizes="(max-width: 24px)"/>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={debtStyles.divider}></div>
            <div className={debtStyles.totalDebtsItem}>
                <p>받은 금액</p>
                <h3 className={fontStyles.bold}>{totalReceived.toLocaleString('ko-kr')} 원</h3>
                <div className={debtStyles.profileContainer}>
                    {totalReceivedMembers.map((profile: string, index) => {
                        return (
                            <div className={`${mainStyles.imageBox.imageBox24} ${debtStyles.inlineBlock}`} key={index}>
                                <Image src={profile} alt="member profile" fill={true} objectFit="cover"
                                       sizes="(max-width: 24px)"/>
                            </div>
                        );
                    })}
                </div>
            </div>

        </article>
    );
}