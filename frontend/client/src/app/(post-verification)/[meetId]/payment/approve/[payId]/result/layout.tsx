import type {Metadata} from "next";
import {ReactNode} from "react";
import * as styles from "@/styles/payment/select/payment.css"
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getMembers} from "@/api/member";
import {getAccount} from "@/api/account";
import {getPayment} from "@/api/payment";
import { getReceipt } from '@/api/receipt';

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

type Props = { children: ReactNode, receipt:ReactNode, params: { payId: string }}

export default async function PaymentModalLayout({children,receipt, params}: Props) {
    const {payId} = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['receipt',payId], queryFn: getReceipt});
    queryClient.getQueryData(['receipt',payId]);

    const dehydratedState = dehydrate(queryClient);


    return (
        <div className="w-[100%]">
            <HydrationBoundary state={dehydratedState}>
                {receipt}
                {children}
            </HydrationBoundary>
        </div>
    );
}
