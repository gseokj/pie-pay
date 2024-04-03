'use client';

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import logoKorea from "@/assets/icons/logoKorea.svg";
import logoKDB from "@/assets/icons/logoKDB.svg";
import logoIBK from "@/assets/icons/logoIBK.svg";
import logoKook from "@/assets/icons/logoKookmin.svg";
import visibilityOff from '@/assets/icons/visibilityOff.svg';
import visibilityOn from '@/assets/icons/visibilityOn.svg';
import * as styles from '@/styles/main/bankAccount.css';
import * as fontCss from '@/styles/fonts.css';
import { Account } from '@/model/account';
import { getCookie } from '@/util/getCookie';
import theme from "@/styles/theme/theme";

export default function BankAccount() {
  const token = getCookie('accessToken');
  const queryClient = useQueryClient();

  const account: Account[] | undefined = queryClient.getQueryData([
    'account',
    token,
  ]);

  const [visibility, setVisibility] = useState(true);
  const [bankName, setBankName] = useState('은행 명');
  const [bankColor, setBankColor] = useState(theme.korea);
  const [bankIcon, setBankIcon] = useState(logoKorea);

  console.log(account);

  useEffect(() => {
    if (typeof account !== 'undefined') {
      switch (account[0].bankCode) {
        case '001':
          setBankName('한국은행');
          setBankColor(theme.korea);
          setBankIcon(logoKorea);
          break;
        case '002':
          setBankName('산업은행');
          setBankColor(theme.kdb);
          setBankIcon(logoKDB);
          break;
        case '003':
          setBankName('기업은행');
          setBankColor(theme.ibk);
          setBankIcon(logoIBK);
          break;
        case '004':
          setBankName('국민은행');
          setBankColor(theme.kook);
          setBankIcon(logoKook);
          break;
        default:
          setBankName('한국은행');
          break;
      }
    }
  }, []);
  const visibilityCheck = () => {
    setVisibility(!visibility);
  };

  return (
    <div className={styles.bankAccountContainer} style={{ backgroundColor: bankColor }}>
      <div className={styles.bankAccountInfoContainer}>
        {typeof account !== 'undefined' && (
          <>
            <div className={styles.bankLogoContainer}>
              <Image
                className={styles.bankLogo}
                src={bankIcon}
                height={28}
                width={28}
                alt="logo Hana"
              />
            </div>
            <div className={styles.bankAccountStringContainer}>
              <span className={`${styles.bankName} ${fontCss.semibold}`}>
                {bankName}
              </span>
              <span className={styles.bankAccountNumber}>
                {account[0].accountNo}
              </span>
              <span className={`${styles.bankAccountBalance} ${fontCss.bold}`}>
                {visibility
                  ? Number(account[0].balance).toLocaleString('ko-kr') + ' 원'
                  : '금액 가려짐'}
              </span>
            </div>
          </>
        )}
      </div>
      <div className={styles.visibilityContainer}>
        <Image
          onClick={visibilityCheck}
          src={visibility ? visibilityOff : visibilityOn}
          alt="visibility check"
        />
      </div>
    </div>
  );
}
