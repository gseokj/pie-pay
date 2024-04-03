'use client'

import * as styles from "@/styles/payment/result/result.css";
import {useReceiptModal} from "@/store/useReceiptModal";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getReceipt} from "@/api/receipt";
import {Receipt} from "@/model/receipt";
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';

type Props={
    payId: number;
}
export default function ReceiptBox({payId}:Props){
    const [token, setToken] = useState('');
    useEffect(() => {
        const token = getCookie('accessToken') as string;
        setToken(token);
    }, []);
    const {updateState} = useReceiptModal();
    const onClickReceipt = () =>{
        updateState();
    }
    const queryClient = useQueryClient();
    const receipt: Receipt|undefined = queryClient.getQueryData(['receipt', payId,token]);

    return (<div className={styles.box}>
        <p className={styles.boxParagraph.title}>{receipt?.storeInfo.storeName}</p>
        <p className={styles.boxParagraph.balance}>{receipt?.totalAmount && receipt?.totalAmount.toLocaleString()} 원</p>
        <div className={styles.receiptBox}>
            <button onClick={onClickReceipt} className={styles.receiptButton}>영수증 확인</button>
        </div>
    </div>);
}