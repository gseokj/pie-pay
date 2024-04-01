'use client';

import * as styles from '@/styles/payment/result/receipt.css';
import { useReceiptModal } from '@/store/useReceiptModal';
import { useQuery } from '@tanstack/react-query';
import { getReceipt } from '@/api/receipt';
import Image from 'next/image';
import back from '@/assets/icons/x.svg';
import { getDateAndTime } from '@/util/dateFormat';


export default function Page() {
  const {isVisible, updateState} = useReceiptModal();
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
        <>
          <div className={styles.content}>
            <p className={styles.paragraph}>{"봉족"}</p>
            <ul className={styles.ul.store}>
              <li>{"010-28391132"}</li>
              <li>{"지하"}</li>
              <li>{getDateAndTime(new Date(202402959))}</li>
            </ul>
            <ul className={styles.ul.menu}>
              <li>메뉴명</li>
              <li>가격</li>
              <li>수량</li>
              <li>합계</li>
            </ul>
            <hr />
              <ul className={styles.ul.menu} >
                <li>대족</li>
                <li>40000</li>
                <li>2</li>
                <li>80000</li>
              </ul>
            <hr/>
            <ul className={styles.ul.menu}>
              <li/><li/><li/>
              <li >800000</li>
            </ul>
          </div></>
      </div>
    </div>);
}