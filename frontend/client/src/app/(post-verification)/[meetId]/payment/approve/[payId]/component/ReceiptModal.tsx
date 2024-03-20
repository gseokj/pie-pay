'use client'

import { useQuery } from '@tanstack/react-query';
import { getReceipt } from '@/api/receipt';
import * as styles from '@/styles/payment/result/receiptmodal.css'

type Props = { payId: string }
export default function ReceiptModal({ payId }: Props) {
  const { data: receipt, isLoading, error } = useQuery({ queryKey: ['receipt', payId], queryFn: getReceipt });
  return (<div className={styles.container}>
    <p className={styles.paragraph}>{receipt?.storeName}</p>
    <ul className={styles.ul.store}>
      <li>{receipt?.phone}</li>
      <li>{receipt?.address}</li>
      <li>{receipt?.createdAt}</li>
    </ul>
    <ul className={styles.ul.menu}>
      <li>메뉴명</li>
      <li>가격</li>
      <li>수량</li>
      <li>합계</li>
    </ul>
    <hr />
    {receipt && receipt.menuItems && receipt?.menuItems.map((menuItem) => (
      <ul className={styles.ul.menu} key={menuItem.menuName}>
        <li>{menuItem.menuName}</li>
        <li>{menuItem.menuPrice.toLocaleString()}</li>
        <li>{menuItem.quantity}</li>
        <li>{(menuItem.menuPrice * menuItem.quantity).toLocaleString()}</li>
      </ul>
    ))}
    <hr/>
    <ul className={styles.ul.menu}>
      <li/><li/><li/>
      <li >{receipt?.totalAmount.toLocaleString()}</li>
    </ul>
  </div>);
}