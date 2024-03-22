import type {Metadata} from "next";
import {ReactNode} from "react";
import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {getMembers} from "@/api/member";
import * as styles from "@/styles/meet/meetMain.css"

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default async function PaymentModalLayout({children, params}: Props) {
    const {meetId} = params;
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({queryKey: ['members',meetId], queryFn: getMembers})
    const dehydratedState = dehydrate(queryClient);


    return (
        <div className={styles.container}>
            <HydrationBoundary state={dehydratedState}>
                {children}
            </HydrationBoundary>
        </div>
    );
}