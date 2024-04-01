"use client";


import {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getCookie} from "@/util/getCookie";
import {useQueryClient} from "@tanstack/react-query";
import {filterPayments, filterTotalAmount, findStandardTime} from "@/util/filterPayments";
import PaymentCard from "@/app/(post-verification)/[meetId]/component/PaymentCard";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import backIcon from "@/assets/icons/back.svg";
import nextActiveIcon from "@/assets/icons/nextActive.svg";
import nextDisabledIcon from "@/assets/icons/nextDisabled.svg";
import prevActiveIcon from "@/assets/icons/previousActive.svg";
import prevDisabledIcon from "@/assets/icons/previousDisabled.svg";
import Image from "next/image";
import {Payment} from "@/model/meet/payment";
import {Meet} from "@/model/meet";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}


interface StandardTime {
    newestMonth: number|null;
    newestYear: number|null;
    oldestMonth: number|null;
    oldestYear: number|null;
}


export default function History({params}: Props) {
    const { meetId } = params;
    const router = useRouter();
    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const payments: Payment[]|undefined = queryClient.getQueryData(['meetPayments', meetId, token]);
    const meetInfo: Meet|undefined = queryClient.getQueryData(['meetInfo', meetId, token]);

    const [filteredPayments, setFilteredPayments] = useState<Payment[]>();
    const [totalAmount, setTotalAmount] = useState<number>(0);

    const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
    const [targetMonth, setTargetMonth] = useState<number>(new Date().getMonth() + 1);
    const [standardTime, setStandardTime] = useState<StandardTime>(
        {
            newestMonth: new Date().getMonth() + 1,
            newestYear: new Date().getFullYear(),
            oldestMonth: new Date().getMonth() + 1,
            oldestYear: new Date().getFullYear(),
        }
    );
    const [isExistPrevious, setIsExistPrevious] = useState<boolean>(false);
    const [isExistNext, setIsExistNext] = useState<boolean>(false);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        setTargetYear(currentYear);
        setTargetMonth(currentMonth);

        if (typeof payments !== 'undefined') {
            setFilteredPayments(filterPayments(currentYear, currentMonth, payments));
            const {newestMonth, newestYear, oldestYear, oldestMonth} = findStandardTime(payments);
            if (newestMonth !== null && typeof newestYear !== 'undefined') {
                setStandardTime(oldData => ({
                    ...oldData,
                    newestMonth: newestMonth,
                    newestYear: newestYear
                }));
            }
            if (oldestMonth !== null && typeof oldestYear !== 'undefined') {
                setStandardTime(oldData => ({
                    ...oldData,
                    oldestMonth: oldestMonth,
                    oldestYear: oldestYear
                }));
            }
            setIsExistPreviousOrNext();
        }
        console.log(standardTime, targetYear, targetMonth);
        setIsExistPreviousOrNext();
    }, [payments]);

    useEffect(() => {
        setIsExistPreviousOrNext();
        if (typeof filteredPayments !== 'undefined') {
            setTotalAmount(filterTotalAmount(filteredPayments));
        }
    }, [standardTime, targetMonth, targetYear]);

    const setIsExistPreviousOrNext = () => {
        if (targetMonth === standardTime.oldestMonth && targetYear === standardTime.oldestYear) {
            setIsExistPrevious(false);
        } else {
            setIsExistPrevious(true);
        }
        if (targetMonth === standardTime.newestMonth && targetYear === standardTime.newestYear) {
            setIsExistNext(false);
        } else {
            setIsExistNext(true);
        }
    }

    const onClickBack = () => {
        router.back();
    }

    const onClickPrevious = () => {
        if (isExistPrevious){
            if (targetMonth === 1) {
                const nextTargetMonth = 12;
                const nextTargetYear = targetYear - 1;
                setTargetMonth(nextTargetMonth);
                setTargetYear(nextTargetYear);
                if (typeof payments !== 'undefined') {
                    const nextFilteredPayments = filterPayments(nextTargetYear, nextTargetMonth, payments);
                    setFilteredPayments(nextFilteredPayments);
                }
            } else {
                const nextTargetMonth = targetMonth - 1;
                const nextTargetYear = targetYear;
                setTargetMonth(nextTargetMonth);
                setTargetYear(nextTargetYear);
                if (typeof payments !== 'undefined') {
                    const nextFilteredPayments = filterPayments(nextTargetYear, nextTargetMonth, payments);
                    setFilteredPayments(nextFilteredPayments);
                }
            }
        }
    }

    const onClickNext = () => {
        if (isExistNext){
            if (targetMonth === 12) {
                const nextTargetMonth = 1;
                const nextTargetYear = targetYear + 1;
                setTargetMonth(nextTargetMonth);
                setTargetYear(nextTargetYear);
                if (typeof payments !== 'undefined') {
                    const nextFilteredPayments = filterPayments(nextTargetYear, nextTargetMonth, payments);
                    setFilteredPayments(nextFilteredPayments);
                }
            } else {
                const nextTargetMonth = targetMonth + 1;
                const nextTargetYear = targetYear;
                setTargetMonth(nextTargetMonth);
                setTargetYear(nextTargetYear);
                if (typeof payments !== 'undefined') {
                    const nextFilteredPayments = filterPayments(nextTargetYear, nextTargetMonth, payments);
                    setFilteredPayments(nextFilteredPayments);
                }
            }
        }
    }

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>결제 내역</h1>
            </header>
            <div>
                <button onClick={onClickPrevious}>
                    <Image src={isExistPrevious ? prevActiveIcon : prevDisabledIcon} alt="previous icon" width={32}
                           height={32}/>
                </button>
                <h2 className={fontStyles.bold}>{`${targetYear}년 ${targetMonth}월`}</h2>
                <button onClick={onClickNext}>
                    <Image src={isExistNext ? nextActiveIcon : nextDisabledIcon} alt="next icon" width={32}
                           height={32}/>
                </button>
            </div>
            <div>{totalAmount !== 0 && totalAmount}</div>

            {typeof filteredPayments !== 'undefined' && typeof meetInfo !== 'undefined' && filteredPayments.length > 0 &&
                filteredPayments.map((payment) => {
                    return (
                        <PaymentCard props={{ payment: payment, meetInfo: meetInfo }} key={payment.orders.orderId} />
                    );
                })
            }
        </section>
    );
}