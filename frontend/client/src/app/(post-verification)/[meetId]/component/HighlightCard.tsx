"use client";


import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as highlightStyles from "@/styles/meet/meetHighlights.css";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import icon from "@/assets/icons/checkbeer.svg";
import totalPayAmountIcon from "@/assets/icons/totalPayAmount.svg";
import meetLeaderIcon from "@/assets/icons/meetLeader.svg";
import coinsIcon from "@/assets/icons/coins.svg";
import beerIcon from "@/assets/icons/resultbeer.svg";
import liquorIcon from "@/assets/icons/liquor.svg";
import chartIcon from "@/assets/icons/chart.svg";
import starIcon from "@/assets/icons/star.svg";
import categoryIcon from "@/assets/icons/category.svg";
import paymentIcon from "@/assets/icons/totalPayments.svg";
import {Highlight, MonthInfo} from "@/model/meet/highlight";
import {avgPayLayout, iconHeaderNoMargin, oneLineInner} from "@/styles/meet/meetHighlights.css";
import {Payment} from "@/model/meet/payment";
import {filterCategory} from "@/util/filterPayments";
import {Legend, Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip} from "chart.js";
import {Bar} from "react-chartjs-2";
import LegendCategory from "@/app/(post-verification)/[meetId]/history/component/LegendCategory";
import React, {useEffect, useState} from "react";
import theme from "@/styles/theme/theme";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

type HighlightProps = {
    props: {
        highlight: Highlight;
        payments?: Payment[];
        category: "모임횟수"|"최다참석자"|"지출총액"|"평균지출"|"모임추이"|"최다카테고리"|"술";
        type: "리스트"|"카드"
    }
}

export default function HighlightCard({ props }: HighlightProps) {
    const { highlight, payments, category, type } = props;

    if (category === "최다참석자" && type === "리스트") {

        return (
            <div className={highlightStyles.listCardLayout}>
                <div className={highlightStyles.listIconHeader}>
                    <Image src={meetLeaderIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>최다 참석자</h3>
                </div>
                <div className={highlightStyles.listBody}>
                    <div className={mainStyles.imageBox.imageBox56}>
                        <Image
                            src={highlight.mostAttendingMember.profileImage}
                            alt="member profile"
                            fill={true}
                            objectFit="cover"
                            sizes="(max-width: 56px)"
                        />
                    </div>
                    <div className={highlightStyles.listInfo}>
                        <p className={fontStyles.medium}>{highlight.mostAttendingMember.nickname}</p>
                        <h2 className={fontStyles.semibold}>{highlight.memberAttendingCount}
                            <span className={`${highlightStyles.listInfoAdd} ${fontStyles.reqular}`}>회 참여</span>
                        </h2>
                    </div>
                </div>
            </div>
        );

    } else if (category === "지출총액" && type === "리스트") {

        return (
            <div className={highlightStyles.listCardLayout}>
                <div className={highlightStyles.listIconHeader}>
                    <Image src={totalPayAmountIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>모임 지출 총액</h3>
                </div>
                <div className={`${highlightStyles.listBodyOne} ${fontStyles.semibold}`}>
                    <Image src={coinsIcon} alt="icon" width={24} height={24}/>
                    {highlight.totalPayment.toLocaleString('ko-kr')} 원
                    <Image src={coinsIcon} alt="icon" width={24} height={24}/>
                </div>
            </div>
        );

    }  else if (category === "지출총액" && type === "카드") {

        return (
            <div className={highlightStyles.cardLayout}>
                <div className={highlightStyles.oneLineInner}>
                    <div className={highlightStyles.iconHeaderNoMargin}>
                        <Image src={paymentIcon} alt="icon" width={24} height={24}/>
                        <h3 className={fontStyles.semibold}>지출 총액</h3>
                    </div>
                    <p className={`${highlightStyles.oneLineBody} ${fontStyles.semibold}`}>
                        {highlight.totalPayment.toLocaleString('ko-kr')} 원
                    </p>
                </div>
            </div>
        );

    }  else if (category === "모임추이" && type === "카드") {

        const [loaded, setLoaded] = useState(false);

        useEffect(() => {
            setLoaded(true);
        }, []);

        const calcAvg = (data: MonthInfo[]) => {
            const recentMonths = data.slice(-6);
            const total = recentMonths.reduce((acc, current) => acc + current.paymentCount, 0);
            const average = total / recentMonths.length;
            return average.toFixed(1);
        }
        const countAvg = calcAvg(highlight.monthInfos);
        const maxValue = Math.max(...highlight.monthInfos.map(item => item.paymentCount));

        return (
            <div className={highlightStyles.cardLayout}>

                <div className={highlightStyles.spaceBetween}>
                    <div className={highlightStyles.leftBox}>
                        <div className={highlightStyles.iconHeader}>
                            <Image src={chartIcon} alt="icon" width={24} height={24}/>
                            <h3 className={fontStyles.semibold}>모임 추이</h3>
                        </div>
                        <div className={fontStyles.semibold}>
                            한달 평균 {countAvg}번
                        </div>
                    </div>
                    <div style={{display: 'flex', alignItems: 'flex-end', height: '80px', position: 'relative'}}>
                        {highlight.monthInfos.map((item, index) => (
                            <div key={index} style={{
                                width: '18px',
                                // 최대 값에 대한 비율로 높이 설정
                                height: loaded ? `${(item.paymentCount / maxValue) * 100}%` : '0%',
                                backgroundColor: (item.paymentCount / maxValue) > 0.7 ? '#3e8fe5' :
                                    (item.paymentCount / maxValue) > 0.35 ? '#86d758' : '#e78b24',
                                transition: 'height 2s ease-in-out',
                                borderRadius: '6px',
                                margin: '0 4px'
                            }}>
                            </div>
                        ))}
                        <div style={{
                            backgroundColor: 'rgba(235,24,24,0.55)',
                            position: 'absolute',
                            width: "100%",
                            height: "4px",
                            borderRadius: "2px",
                            bottom: loaded ? `${(Number(countAvg) / maxValue) * 100}%` : '0%',
                            right: 0,
                            transition: 'bottom 2s ease-in-out',
                        }}></div>
                    </div>
                </div>
            </div>
        );

    } else if (category === "평균지출" && type === "카드") {

        return (
            <div className={highlightStyles.avgPayLayout}>
                <div className={highlightStyles.iconHeader}>
                    <Image src={totalPayAmountIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>평균 지출</h3>
                </div>
                <p className={`${fontStyles.semibold} ${highlightStyles.avgPayFont}`}>{highlight.averagePayment.toLocaleString('ko-kr').split(".")[0]} 원</p>
            </div>
        );

    }  else if (category === "최다참석자" && type === "카드") {

        return (
            <div className={highlightStyles.cardLayout}>
                <div className={highlightStyles.iconHeader}>
                    <Image src={starIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>최다 참석자</h3>
                </div>
                <div className={highlightStyles.listBody}>
                    <div className={mainStyles.imageBox.imageBox40}>
                        <Image
                            src={highlight.mostAttendingMember.profileImage}
                            alt="member profile"
                            fill={true}
                            objectFit="cover"
                            sizes="(max-width: 40px)"
                        />
                    </div>
                    <div className={highlightStyles.cardListInfo}>
                        <p className={fontStyles.semibold}>{highlight.mostAttendingMember.nickname}</p>
                        <h2 className={fontStyles.semibold}>{highlight.memberAttendingCount}
                            <span className={`${highlightStyles.listInfoAdd} ${fontStyles.reqular}`}>회 참여</span>
                        </h2>
                    </div>
                </div>
            </div>
        );

    } else if (category === "최다카테고리" && type === "카드" && typeof payments !== 'undefined') {

        const [loaded, setLoaded] = useState(false);

        useEffect(() => {
            // 컴포넌트가 마운트된 후 애니메이션 시작
            setLoaded(true);
        }, []);

        const categories = filterCategory(payments);
        console.log(categories);


        const totalValue = categories.reduce((acc, item) => acc + item.amount, 0);
        const colors = ["rgb(250,157,91)", "rgb(105,238,117)", "rgb(125,161,231)"];

        return (
            <div className={highlightStyles.cardLayout}>
                <div className={highlightStyles.iconHeader}>
                    <Image src={categoryIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>최다 지출 카테고리</h3>
                </div>
                <div className={highlightStyles.centerInner}>
                    <div style={{width: '100%', height: '1.5rem', display: 'flex', gap: '4px'}}>
                        {categories.map((item, index) => (
                            <div key={index} style={{
                                width: loaded ? `${(item.amount / totalValue) * 100}%` : '0%',
                                backgroundColor: colors[index],
                                transition: 'width 1s ease-in-out',
                                borderRadius: '8px'
                            }}/>
                        ))}
                    </div>
                    <div>
                        <LegendCategory props={{ category: categories[0], totalAmount: totalValue, index: 0 }} />
                        {/*{categories.map((category, index) => {*/}
                        {/*    return (*/}
                        {/*        <LegendCategory props={{ category, totalAmount: totalValue, index }} key={index} />*/}
                        {/*    );*/}
                        {/*})}*/}
                    </div>
                </div>
            </div>
        );

    } else if (category === "술" && type === "카드") {
        const [currentCount, setCurrentCount] = useState(0);

        const drinkCount = highlight.drinkCount

        useEffect(() => {
            // 목표 개수에 도달할 때까지 요소 개수를 증가
            if (currentCount < drinkCount) {
                const timer = setTimeout(() => {
                    setCurrentCount(currentCount + 1);
                }, 100); // 1초 간격으로 증가
                return () => clearTimeout(timer);
            }
        }, [currentCount, drinkCount]);

        return (
            <div className={`${highlightStyles.cardLayout} ${highlightStyles.lastCard}`}>
                <div className={highlightStyles.iconHeader}>
                    <Image src={liquorIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>마신 술</h3>
                </div>
                <div className={highlightStyles.centerInner2}>
                    <div className={highlightStyles.alcoholBox}>
                        {Array.from({length: currentCount}, (_, i) => (
                            <div key={i}>
                                <Image src={beerIcon} alt="alcohol" width={24} height={24}/>
                            </div>
                        ))}
                    </div>
                    <p className={`${fontStyles.semibold}`} style={{marginLeft: "0.4rem"}}>총 {currentCount}병</p>
                </div>
            </div>
        );

    } else {
        console.log('잘못된 type | category');
        return (
            <div className={cardStyles.cardLayout.default80}>
                <div className={cardStyles.cardInnerLayout.iconHeader}>
                    <Image src={icon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>잘못된 카테고리</h3>
                </div>
            </div>
        );
    }

}