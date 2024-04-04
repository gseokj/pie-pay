'use client'

import * as styles from '@/styles/payment/result/receipt.css';
import { useReceiptModal } from '@/store/useReceiptModal';
import { useQuery } from '@tanstack/react-query';
import { getReceipt } from '@/api/receipt';
import Image from 'next/image';
import back from '@/assets/icons/x.svg';
import { getDateAndTime } from '@/util/dateFormat';


const menuItems = [{menuName: "족발(대)",menuPrice: 62000, quantity: 1},{menuName: "계란찜",menuPrice: 8000, quantity: 1},{menuName: "참이슬",menuPrice: 5000,quantity: 3},{menuName: "카스", menuPrice: 5000, quantity: 2}]
const menuItems2 = [{menuName: "담배",menuPrice: 4000, quantity: 1},{menuName: "라면",menuPrice: 4000, quantity: 1},{menuName: "참이슬",menuPrice: 5000,quantity: 3},{menuName: "카스", menuPrice: 5000, quantity: 2}]
const paymentResult = {orderMenuId:1, storeName: "(주) 뽕족 강남역본점",address: "서울 강남구 테헤란로4길 15(역삼동)",phone:"010-2839-1132",createdAt: "2024-03-20T11:39:04.663Z",menuItems,totalAmount:95000}



export default function ReceiptModal() {
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
          <div className={styles.content}>
            <p className={styles.paragraph}></p>
            <ul className={styles.ul.store}>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <ul className={styles.ul.menu}>
              <li>메뉴명</li>
              <li>가격</li>
              <li>수량</li>
              <li>합계</li>
            </ul>
            <hr />
              <ul className={styles.ul.menu} >
                <li></li>
                <li> </li>
                <li></li>
                <li> </li>
              </ul>
            <hr/>
            <ul className={styles.ul.menu}>
              <li/><li/><li/>
              <li ></li>
            </ul>
          </div>
      </div>
      </div>
  )};