"use client";


import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";
import {getCookie} from "@/util/getCookie";
import {useQueryClient} from "@tanstack/react-query";
import {Payment} from "@/model/meet/payment";
import {Meet} from "@/model/meet";
import PaymentCard from "@/app/(post-verification)/[meetId]/component/PaymentCard";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function History({params}: Props) {
    const { meetId } = params;
    const router = useRouter();
    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const payments: Payment[]|undefined = queryClient.getQueryData(['meetPayments', meetId, token]);
    const meetInfo: Meet|undefined = queryClient.getQueryData(['meetInfo', meetId, token]);

    const onClickBack = () => {
        router.back();
    }

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>결제 내역</h1>
            </header>
            {typeof payments !== 'undefined' && typeof meetInfo !== 'undefined' && payments.length > 0 &&
                payments.map((payment) => {
                    return (
                        <PaymentCard props={{ payment: payment, meetInfo: meetInfo }} key={payment.orders.orderId} />
                    );
                })
            }
        </section>
    );
}