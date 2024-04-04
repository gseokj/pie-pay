import * as styles from '@/styles/mypage/myAccount.css';
import BankAccount from '@/app/(post-verification)/component/BankAccount';
import Image from 'next/image';
import addAccount from '@/assets/icons/addaccount.svg';
import React from 'react';

export default function MyAccount() {
  return (
    <section className={styles.accountSection}>
      <p className={styles.title}>내 계좌</p>
      <div className={styles.accountContent}>
        <div className={styles.accountCurrBox}>
          <BankAccount />
        </div>
        <div className={styles.accountAddBox}>
          <Image src={addAccount} alt="" />
          <p>계좌 추가</p>
        </div>
      </div>
    </section>
  );
}
