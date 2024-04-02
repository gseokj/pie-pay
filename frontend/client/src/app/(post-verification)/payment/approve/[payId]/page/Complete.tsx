'use client'

import Header from "@/app/(post-verification)/payment/component/Header";
import three from "@/assets/icons/payment3.svg";
import * as styles from "@/styles/payment/result/result.css";
import ParticipantResultList from "@/app/(post-verification)/payment/approve/[payId]/component/ParticipantResultList";
import ReceiptBox from "@/app/(post-verification)/payment/approve/[payId]/component/ReceiptBox";
import {useQuery} from "@tanstack/react-query";
import {getPaymentResult} from "@/api/payment";
import ReceiptModal from "@/app/(post-verification)/payment/approve/[payId]/component/ReceiptModal";
import { useRouter } from 'next/navigation';

type Props={ payId: number }
export default function Complete({payId}: Props) {
    const router = useRouter();
    return (<>
        <ReceiptModal payId={Number(payId)}/>
        <Header type={three}/>
        <p className={styles.pargraph.title}>결제가 완료됐어요</p>
        <ReceiptBox payId={Number(payId)}/>

        <ParticipantResultList payId={Number(payId)}/>

        <button onClick={()=>router.replace("/")} className={styles.submitButton}>확인</button>

    </>);
}