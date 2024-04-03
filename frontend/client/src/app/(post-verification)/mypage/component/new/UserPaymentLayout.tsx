"use client";

import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {getCookie} from "@/util/getCookie";
import {MyPayment} from "@/model/user/payments";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import UserPaymentCard from "@/app/(post-verification)/mypage/component/new/UserPaymentCard";
import UserPaymentReceiptModal from "@/app/(post-verification)/mypage/component/new/UserPaymentReceiptModal";

export default function UserPaymentLayout() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [firstItem, setFirstItem] = useState<MyPayment>();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token !== null) {
            const userPayments: MyPayment[]|undefined = queryClient.getQueryData(['userPayments', token]);
            if (typeof userPayments !== "undefined" && userPayments.length > 0) {
                setFirstItem(userPayments[0]);
            }
        }
    }, []);

    const onClickPush = () => {
        router.push('/mypage/payment-list');
    }

    if (typeof firstItem !== 'undefined') {
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
                    {typeof firstItem !== 'undefined' &&
                        <UserPaymentCard props={{ payment: firstItem }}/>
                    }
                </section>
                <UserPaymentReceiptModal payId={firstItem.payId} />
            </>
        );
    } else {
        return (
            <>
                <section>
                    <div className={mainStyles.categoryContainer.default}>
                        <h3 className={fontStyles.bold}>결제 내역</h3>
                    </div>
                    <p>결제 내역이 없습니다.</p>
                </section>
            </>
        );
    }

}