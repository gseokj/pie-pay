"use client";


import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {getCookie} from "@/util/getCookie";
import {useQueryClient} from "@tanstack/react-query";
import {
    calculateCategoryAmountsAndPercentages, filterCategory,
    filterPayments,
    filterTotalAmount,
    findStandardTime
} from "@/util/filterPayments";
import PaymentCard from "@/app/(post-verification)/[meetId]/component/PaymentCard";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as paymentStyles from "@/styles/meet/meetPayments.css";
import backIcon from "@/assets/icons/back.svg";
import nextActiveIcon from "@/assets/icons/nextActive.svg";
import nextDisabledIcon from "@/assets/icons/nextDisabled.svg";
import prevActiveIcon from "@/assets/icons/previousActive.svg";
import prevDisabledIcon from "@/assets/icons/previousDisabled.svg";
import Image from "next/image";
import {Category, Payment} from "@/model/meet/payment";
import {Meet} from "@/model/meet";
import {Doughnut} from "react-chartjs-2";
import {ArcElement, Chart as ChartJS, Legend, Tooltip} from "chart.js";
import * as styles from "@/styles/main/main.css";
import LegendCategory from "@/app/(post-verification)/[meetId]/history/component/LegendCategory";
import PaymentReceiptModal from "@/app/(post-verification)/[meetId]/component/PaymentReceiptModal";
import {useStore} from "@/store/useMeetModalStore";


ChartJS.register(ArcElement, Tooltip, Legend);


type Props = {
    params: { meetId: string },
}

interface StandardTime {
    newestMonth: number|null;
    newestYear: number|null;
    oldestMonth: number|null;
    oldestYear: number|null;
}

interface DoughnutData {
    labels: string[];
    datasets: Dataset[];
}

interface Dataset {
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
}

export default function History({params}: Props) {
    const { meetId } = params;
    const router = useRouter();
    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const {setReceiptModalStatus, payId} = useStore((state) => state);

    useEffect(()=>{
        setReceiptModalStatus(false);
    }, []);

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

    const [categories, setCategories] = useState<Category[]>([]);

    const [data, setData] = useState<DoughnutData>({
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderWidth: 4,
            }
        ]
    });

    const options = {
        plugins: {
            legend: {
                display: false
            }
        },
        cutout: '35%'
    };

    const doughnutData: DoughnutData = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderWidth: 4,
            }
        ]
    };

    const doughnutColors = ["rgb(250,157,91)", "rgb(105,238,117)", "rgb(125,161,231)"];

    const setDoughnut = (payments: Payment[]) => {
        const categoryData = filterCategory(payments);
        setCategories(categoryData);
        categoryData.forEach((category, index) => {
            doughnutData.labels.push(category.name);
            doughnutData.datasets[0].data.push(category.amount);
            doughnutData.datasets[0].backgroundColor.push(doughnutColors[index]);
        });
    }

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;
        setTargetYear(currentYear);
        setTargetMonth(currentMonth);

        if (typeof payments !== 'undefined') {
            setFilteredPayments(filterPayments(currentYear, currentMonth, payments));
            console.log(filterCategory(filterPayments(currentYear, currentMonth, payments)));
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
            setDoughnut(payments);
            setData(doughnutData);
        }
        console.log(standardTime, targetYear, targetMonth);
        setIsExistPreviousOrNext();
    }, [payments]);

    useEffect(() => {
        setIsExistPreviousOrNext();
        if (typeof filteredPayments !== 'undefined') {
            setTotalAmount(filterTotalAmount(filteredPayments));
            setDoughnut(filteredPayments);
            console.log(doughnutData);
            setData(doughnutData);
            console.log(data);
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
    <>
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>결제 내역</h1>
            </header>
            <div className={paymentStyles.timeStandardLayout}>
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
            {typeof filteredPayments !== 'undefined' && typeof meetInfo !== 'undefined' && filteredPayments.length > 0 ?
                <section>
                    <div className={paymentStyles.indexCard}>
                        <div className={paymentStyles.doughnutInner}>
                            <div className={paymentStyles.doughnutBox}>
                                <Doughnut data={data} options={options}/>
                            </div>
                            <div className={paymentStyles.legendLayout}>
                                {categories.map((category, index) => {
                                    return (
                                        <LegendCategory props={{ category, totalAmount, index }} key={index} />
                                    );
                                })}
                            </div>
                        </div>
                        <div className={`${fontStyles.semibold} ${paymentStyles.amountBox}`}>
                            <p>총 금액 <span
                                className={`${fontStyles.bold} ${paymentStyles.amountFontSet}`}> {totalAmount.toLocaleString('ko-kr')} 원</span>
                            </p>
                        </div>
                    </div>

                    <div className={styles.categoryContainer.default}>
                        <div className={styles.category}>
                            <h3 className={fontStyles.bold}>결제 건수</h3>
                            <p>{typeof filteredPayments !== 'undefined' && filteredPayments.length}</p>
                        </div>
                    </div>

                    <div className={paymentStyles.paymentsLayout}>
                        {typeof filteredPayments !== 'undefined' && typeof meetInfo !== 'undefined' && filteredPayments.length > 0 &&
                            filteredPayments.map((payment) => {
                                if (payment.orders.paymentStatus !== 'UNPAID' || payment.payStatus !== 'ING') {
                                    return (
                                        <PaymentCard props={{payment: payment, meetInfo: meetInfo}}
                                                     key={payment.orders.orderId}/>
                                    );
                                }
                            })
                        }
                    </div>

                </section>
                :
                <section>결제 내역이 없습니다</section>
            }
        </section>
        {typeof payId !== 'undefined' &&
            <PaymentReceiptModal payId={payId} />
        }
    </>
    );
}