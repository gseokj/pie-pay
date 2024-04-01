'use client';

import { postBankVerify } from '@/api/signin';
import { ChangeEvent, useEffect, useState } from 'react';
import ProgressBar from '@/app/(pre-verification)/sign-in/_component/ProgressBar';
import * as styles from '@/styles/signin/singin.css';
import { useRouter } from 'next/navigation';
import BankListModal from '../../_component/BankListModal';
import { useStore } from '@/store/useAccountStore';
import { getCookie } from '@/util/getCookie';
import { RequestBankVerify } from '@/model/signin';
export default function Page() {
  const [isValid, setIsValid] = useState({
    bankName: true,
    accountNumber: true,
  });
  const { accountInfo, setAccountInfo } = useStore();
  const [info, setInfo] = useState({
    bankName: '',
    accountNumber: '',
  });

  useEffect(() => {
    console.log('bankName : ' + info.bankName);
    console.log('accountNumber : ' + info.accountNumber);
  }, [info]);

  const router = useRouter();
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setBank = (bankName: string) => {
    setInfo((prevInfo) => ({
      ...prevInfo,
      bankName: bankName,
    }));
  };

  const route = () => {
    const isBankNameValid = !!info.bankName;
    const isAccountNumberValid = !!info.accountNumber;
    setIsValid({
      bankName: isBankNameValid,
      accountNumber: isAccountNumberValid,
    });
    if (isBankNameValid && isAccountNumberValid) {
      setAccountInfo({ bankCode: '001', accountNo: info.accountNumber });
      sendRequest();
      router.push('/sign-in/account-auth/input-code');
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'accountNumber') {
      if (/^\d*$/.test(value)) {
        setInfo({ ...info, [name]: value });
      }
    } else {
      setInfo({ ...info, [name]: value });
    }
  };

  const token = getCookie('accessToken') as string;

  const sendRequest = async () => {
    console.log('인증 진행');
    {
      try {
        const request: RequestBankVerify = {
          bankCode: '001',
          accountNo: info.accountNumber,
        };
        const response = await postBankVerify(request, token);
        console.log(response);
      } catch (error) {}
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.barContainer}>
        <ProgressBar />
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.title}>은행 계좌 인증</div>
        <form className={styles.formContainer}>
          <div className={styles.itemWrapper} onClick={handleShowModal}>
            <div className={styles.itemName}>은행</div>
            <input
              type="text"
              className={`${styles.inputBox} ${isValid.bankName ? '' : styles.inputError}`}
              name="bankName"
              value={info.bankName}
              onChange={handleChange}
              readOnly
            ></input>
          </div>
          <div className={styles.itemWrapper}>
            <div className={styles.itemName}>계좌번호</div>
            <input
              type="text"
              className={`${styles.inputBox} ${isValid.accountNumber ? '' : styles.inputError}`}
              name="accountNumber"
              value={info.accountNumber}
              onChange={handleChange}
            ></input>
          </div>
        </form>
        <div className={styles.submitButton} onClick={route}>
          본인 인증
        </div>
      </div>
      {showModal && <BankListModal onClose={closeModal} onSelect={setBank} />}
    </div>
  );
}
