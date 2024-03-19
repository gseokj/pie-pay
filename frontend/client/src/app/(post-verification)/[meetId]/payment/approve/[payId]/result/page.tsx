'use client'

import Header from "@/app/(post-verification)/[meetId]/payment/component/Header";
import three from "@/assets/icons/payment3.svg";
import {useRouter} from "next/navigation";
import * as styles from "@/styles/payment/result/result.css";
import ParticipantResultList from "@/app/(post-verification)/[meetId]/payment/approve/[payId]/component/ParticipantResultList";
import { useReceiptModal } from '@/store/useReceiptModal';

type Props={
    params: { payId: string },
}
export default function Page({params}: Props) {
    const {payId} = params;
    const {updateState} = useReceiptModal();
    const onClickReceipt = () =>{
        updateState();
    }
    return (<>
        <Header type={three}/>
        <p className={styles.pargraph.title}>결제가 완료됐어요</p>
        <div className={styles.box}>
            <p className={styles.boxParagraph.title}>(주) 뽕족 강남역본점</p>
            <p className={styles.boxParagraph.balance}>95000 원</p>
            <div className={styles.receiptBox}>
                <button onClick={onClickReceipt} className={styles.receiptButton}>영수증 확인</button>
            </div>
        </div>

        <p className={styles.pargraph.paymentMember}>결제 멤버 5</p>
        <ParticipantResultList payId={payId}/>

        <button className={styles.submitButton}>확인</button>

    </>);
}