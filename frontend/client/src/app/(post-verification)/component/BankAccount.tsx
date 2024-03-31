"use client";


import {useEffect, useState} from "react";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getAccount} from "@/api/account";
import Image from "next/image";
import logoHana from "@/assets/icons/logoHana.svg";
import visibilityOff from "@/assets/icons/visibilityOff.svg";
import visibilityOn from "@/assets/icons/visibilityOn.svg";
import * as styles from "@/styles/main/bankAccount.css";
import * as fontCss from "@/styles/fonts.css";
import {Account, AccountResponse} from "@/model/account";
import {getCookie} from "@/util/getCookie";

const account = [{
    accountId: 1,
    bankCode: '하나은행',
    accountNo: "01923479283157"
}]


export default function BankAccount() {
    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const accountResponse: AccountResponse|undefined = queryClient.getQueryData(['account', token]);
    const account = accountResponse?.result;

    const [visibility, setVisibility] = useState(true);
    const [bankName, setBankName] = useState('은행 명');

    useEffect(() => {
        if (typeof account !== 'undefined') {
            switch (account[0].bankCode) {
                case '001':
                    setBankName('한국은행');
                    break;
                case '002':
                    setBankName('산업은행');
                    break;
                case '003':
                    setBankName('기업은행');
                    break;
                case '004':
                    setBankName('국민은행');
                    break;
                default:
                    setBankName('한국은행');
                    break;
            }
        }
    }, []);
    const visibilityCheck = () => {
        setVisibility(!visibility)
    }

    return (
        <div className={styles.bankAccountContainer}>
            <div className={styles.bankAccountInfoContainer}>
                {typeof account !== 'undefined' &&
                    <>
                        <div className={styles.bankLogoContainer}>
                            <Image className={styles.bankLogo} src={logoHana} height={28} width={28} alt="logo Hana"/>
                        </div>
                        <div className={styles.bankAccountStringContainer}>
                            <span
                                className={`${styles.bankName} ${fontCss.semibold}`}>{bankName}</span>
                            <span
                                className={styles.bankAccountNumber}>{account[0].accountNo}</span>
                            <span
                                className={`${styles.bankAccountBalance} ${fontCss.bold}`}>{visibility ? Number(account[0].balance).toLocaleString('ko-kr') + ' 원' : '금액 가려짐'}</span>
                        </div>
                    </>
                }

            </div>
            <div className={styles.visibilityContainer}>
                <Image onClick={visibilityCheck} src={visibility ? visibilityOff : visibilityOn}
                       alt="visibility check"/>
            </div>
        </div>
    );
}