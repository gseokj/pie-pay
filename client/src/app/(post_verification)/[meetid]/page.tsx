'use client'

import {ReactNode, useEffect} from "react";
import * as styles from "@/styles/payment/select/payment.css"
import {dehydrate, HydrationBoundary, QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {getMeet} from "@/lib/meet/getMeet";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function PaymentModalLayout({params}: Props) {

        const {meetId} = params;
        const queryClient = useQueryClient();
        const Members = queryClient.getQueryData(["meetId",meetId]);
        console.log(Members);



    return (
        <div className={styles.container}>
        </div>
    );
}
