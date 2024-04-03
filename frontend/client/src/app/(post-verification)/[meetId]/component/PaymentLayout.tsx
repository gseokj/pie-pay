"use client";


import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";
import PaymentCard from "@/app/(post-verification)/[meetId]/component/PaymentCard";
import {useEffect, useState} from "react";
import {getCookie} from "@/util/getCookie";
import {useQueryClient} from "@tanstack/react-query";
import {Payment} from "@/model/meet/payment";
import {Meet} from "@/model/meet";
import PaymentReceiptModal from "@/app/(post-verification)/[meetId]/component/PaymentReceiptModal";



interface Props {
    params: { meetId: string },
}

export default function PaymentLayout({ params }: Props) {
    const { meetId } = params;
    const router = useRouter();
    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const payments: Payment[]|undefined = queryClient.getQueryData(['meetPayments', meetId, token]);
    const meetInfo: Meet|undefined = queryClient.getQueryData(['meetInfo', meetId, token]);
    console.log(payments);

    const onClickPush = () => {
        router.push(`/${meetId}/history`);
    }

    if (typeof payments !== 'undefined' && payments.length > 0) {
        return (
            <>
                <section>
                    <div className={mainStyles.categoryContainer.default}>
                        <h3 className={fontStyles.bold}>결제 내역</h3>
                        <button
                            className={fontStyles.bold}
                            onClick={onClickPush}
                        >더보기
                        </button>
                    </div>
                    {typeof payments !== 'undefined' && typeof meetInfo !== 'undefined' &&
                        <PaymentCard props={{payment: payments[0], meetInfo: meetInfo}}/>
                    }
                </section>
                <PaymentReceiptModal payId={payments[0].payId} />
            </>
        );
    } else {
        return (
            <section>
                <div>
                    결제 내역이 없습니다
                </div>
            </section>
        );
    }
}