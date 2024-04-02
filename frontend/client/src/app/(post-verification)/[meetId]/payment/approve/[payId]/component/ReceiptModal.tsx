'use client';

import * as styles from '@/styles/payment/result/receipt.css';
import {useReceiptModal} from '@/store/useReceiptModal';
import Image from "next/image";
import back from "@/assets/icons/x.svg";
import {getDateAndTime} from "@/util/dateFormat";
import {useQuery} from "@tanstack/react-query";
import {getReceipt} from "@/api/receipt";
import { useEffect, useState } from 'react';
import { getCookie } from '@/util/getCookie';

type Props = {
     payId: number ,
}
export default function ReceiptModal({payId}: Props) {
  const [token, setToken] = useState('');
  useEffect(() => {
    const token = getCookie('accessToken') as string;
    setToken(token);
  }, []);
    const {isVisible, updateState} = useReceiptModal();
    const { data: receipt, isLoading, error } = useQuery({ queryKey: ['receipt', payId,token], queryFn: getReceipt });
    return (
        <div className={`${isVisible ? styles.container.invisible : styles.container.visible}`}>
            <div onClick={() => updateState()} className={`${isVisible ? styles.container.invisible : styles.container.visible}`}>
            </div>
            <div
                className={`${isVisible ? styles.modal.visible : styles.modal.invisible}`}>
                <div className={styles.header}>
                    <div/>
                    <div/>
                    <button type="button" aria-label="Go Back" onClick={() => updateState()}>
                        <Image src={back} width={32} height={32} alt='button'/>
                    </button>
                </div>
                <>{ receipt &&
                    <div className={styles.content}>
                        <p className={styles.paragraph}>{receipt.storeInfo.storeName}</p>
                        <ul className={styles.ul.store}>
                            <li>{receipt.storeInfo.phone}</li>
                            <li>{receipt.storeInfo.address}</li>
                            <li>{getDateAndTime(new Date(receipt.createdAt))}</li>
                        </ul>
                        <ul className={styles.ul.menu}>
                            <li>메뉴명</li>
                            <li>가격</li>
                            <li>수량</li>
                            <li>합계</li>
                        </ul>
                        <hr />
                        { receipt.orderMenus.map((menuItem) => (
                            <ul className={styles.ul.menu} key={menuItem.menuName}>
                                <li>{menuItem.menuName}</li>
                                <li>{menuItem.menuPrice && menuItem.menuPrice.toLocaleString()}</li>
                                <li>{menuItem.quantity}</li>
                                <li>{menuItem.menuPrice &&  (menuItem.menuPrice * menuItem.quantity).toLocaleString()}</li>
                            </ul>
                        ))}
                        <hr/>
                        <ul className={styles.ul.menu}>
                            <li/><li/><li/>
                            <li >{receipt.totalAmount &&  receipt.totalAmount.toLocaleString()}</li>
                        </ul>
                    </div>}</>
            </div>
        </div>);
}