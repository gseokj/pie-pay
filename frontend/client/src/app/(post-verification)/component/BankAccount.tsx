"use client";


import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getAccount} from "@/api/account";
import Image from "next/image";
import logoHana from "@/assets/icons/logoHana.svg";
import visibilityOff from "@/assets/icons/visibilityOff.svg";
import visibilityOn from "@/assets/icons/visibilityOn.svg";
import * as styles from "@/styles/main/bankAccount.css";
import * as fontCss from "@/styles/fonts.css";
import {Account} from "@/model/account";
import {getCookie} from "@/util/getCookie";

const account = [{
    accountId: 1,
    bankCode: '하나은행',
    accountNo: "01923479283157"
}]


export default function BankAccount() {
    const token = getCookie('accessToken');
    const { data: account, isLoading, error } = useQuery({queryKey: ['account', token], queryFn: getAccount}) ;
    if (error) console.log(error.message);
    console.log('bank account is ....', account);
    const [visibility, setVisibility] = useState(true);
    const visibilityCheck = () => {
        setVisibility(!visibility)
    }

    return (
        <div className={styles.bankAccountContainer}>
            <div className={styles.bankAccountInfoContainer}>
                <div className={styles.bankLogoContainer}>
                    <Image className={styles.bankLogo} src={logoHana} height={28} width={28} alt="logo Hana"/>
                </div>
                <div className={styles.bankAccountStringContainer}>
                    <span className={`${styles.bankName} ${fontCss.semibold}`}>{isLoading ? '불러오는 중' : account?.bankCode}</span>
                    <span className={styles.bankAccountNumber}>{isLoading ? '불러오는 중' : account?.accountNo}</span>
                    {/*{isLoading ? '불러오는 중' :*/}
                    {/*    <span className={`${styles.bankAccountBalance} ${fontCss.bold}`}>{visibility ? account?.accountBalance.toLocaleString('ko-kr')+' 원' : '금액 가려짐'}</span>*/}
                    {/*}*/}
                </div>
            </div>
            <div className={styles.visibilityContainer}>
                <Image onClick={visibilityCheck} src={visibility ? visibilityOff : visibilityOn} alt="visibility check" />
            </div>
        </div>
    );
}