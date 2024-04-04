"use client";

import {useStore} from "@/store/useMeetModalStore";
import {useEffect, useState} from "react";
import {PayMember, Receipt} from "@/model/meet/payment";
import {getCookie} from "@/util/getCookie";
import {getPaymentMembers, getPaymentReceipt} from "@/api/meet/payment";
import * as styles from "@/styles/main/mainModal.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import * as fontStyles from "@/styles/fonts.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as paymentStyles from "@/styles/meet/meetPayments.css";
import dayjs from "dayjs";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import memberDefaultImage from "@/assets/images/member_default.svg";
import alcoholIcon from "@/assets/icons/resultbeer.svg";
import lenderIcon from "@/assets/icons/resultprofile.svg";
import borrowerIcon from "@/assets/icons/hand.svg";
import dropDownIcon from "@/assets/icons/dropdown.svg";
import dropUpIcon from "@/assets/icons/dropup.svg";
import * as meetStyles from "@/styles/meet/meetMain.css";
import {paymentModalContentLayout} from "@/styles/main/mainModal.css";
import {paymentModalMain} from "@/styles/meet/meetPayments.css";


interface ReceiptProps {
    payId: number;
}

export default function UserPaymentReceiptModal({ payId }: ReceiptProps) {
    const {isUserReceiptModalOn, changeUserReceiptModalStatus} = useStore((state) => state);
    const [receipt, setReceipt] = useState<Receipt|undefined>();
    const [payMembers, setPayMembers] = useState<PayMember|undefined>();
    const [lenders, setLenders] = useState<number[]>([]);
    const [borrowers, setBorrowers] = useState<number[]>([]);

    const [isMembersDropDown, setIsMembersDropDown] = useState<boolean>(false);
    const [isReceiptDropDown, setIsReceiptDropDown] = useState<boolean>(false);

    const getDatas = async (token: string) => {
        const receipt = await getPaymentReceipt(payId, token);
        const payMembers = await getPaymentMembers(payId, token);
        if (typeof receipt !== 'undefined') {
            setReceipt(receipt);
        }
        if (typeof payMembers !== 'undefined') {
            setPayMembers(payMembers);
            setInstead(payMembers);
        }
    };

    const setInstead = (payMembers: PayMember) => {
        payMembers.payInsteadList.forEach((payInstead, index) => {
            const newLender = payInstead.lenderId;
            const newBorrower = payInstead.borrowerId;
            lenders.push(newLender);
            borrowers.push(newBorrower);
        });
    };

    const resetInstead = () => {
        setLenders([]);
        setBorrowers([]);
        setIsMembersDropDown(false);
        setIsReceiptDropDown(false);
    }

    useEffect(() => {
        resetInstead();
    }, []);

    useEffect(()=>{
        const token = getCookie('accessToken');
        if (token !== null) {
            getDatas(token);
        }
        setIsMembersDropDown(false);
        setIsReceiptDropDown(false);
    }, [payId, isUserReceiptModalOn]);

    const onClickReceiptAccordion = () => {
        setIsReceiptDropDown(!isReceiptDropDown);
    }

    const onClickMembersAccordion = () => {
        setIsMembersDropDown(!isMembersDropDown);
    }

    return (
        <>
            <section
                className={`${styles.modalLayout.joinMeetModal} ${isUserReceiptModalOn && styles.modalOn}`}
            >
                <div className={styles.modalHandleArea}>
                    <div className={`${styles.modalHandle}`}></div>
                </div>
                <div className={styles.paymentModalContentLayout}>
                    <div
                        className={cardStyles.cardInnerLayout.defaultHeader}
                    >
                        <h3
                            className={fontStyles.semibold}
                        >{receipt?.storeInfo.storeName}</h3>
                        <p>
                            {receipt?.storeInfo.address}<br/>
                            {receipt?.storeInfo.phone}
                        </p>
                        <div className={styles.timeLayout}>
                            <p>{dayjs(receipt?.createdAt).format("YYYY.MM.DD")}</p>
                            <p>{dayjs(receipt?.createdAt).format("HH:mm:ss")}</p>
                        </div>
                        <div className={mainStyles.line}></div>
                    </div>

                    <main className={paymentStyles.paymentModalMain}>
                        <section>
                            <div>
                                <div className={paymentStyles.dropDownHeader}>
                                    <h3 className={fontStyles.semibold}>결제 멤버 {payMembers?.participants.length}</h3>
                                    <button className="dropDownButton" onClick={onClickMembersAccordion}>
                                        {isMembersDropDown ?
                                            <Image src={dropUpIcon} alt="drop up icon" width={40} height={40}/>
                                            :
                                            <Image src={dropDownIcon} alt="drop down icon" width={40} height={40}/>
                                        }
                                    </button>
                                </div>
                            </div>
                            {payMembers?.participants.map((participant, index) => {
                                return (
                                    <article
                                        className={`${cardStyles.paymentMemberLayout}`}
                                        style={isMembersDropDown ? {display: "flex"} : {display: "none"}}
                                        key={participant.memberInfo.memberId}
                                    >
                                        <div
                                            className={cardStyles.cardInnerLayout.memberCardLeftInner}
                                        >
                                            <div className={mainStyles.imageBox.imageBox40}>
                                                <Image
                                                    className={mainStyles.imageLayout}
                                                    src={participant.memberInfo.profileImage !== null ?
                                                        participant.memberInfo.profileImage
                                                        :
                                                        memberDefaultImage
                                                    }
                                                    alt="meet default image"
                                                    fill={true}
                                                    sizes="(max-width: 40px)"
                                                />
                                            </div>
                                            <div className={cardStyles.participantInfoLayout}>
                                                <h5>{participant.memberInfo.nickname}</h5>
                                                <div className={cardStyles.paymentTagLayout}>
                                                    {typeof borrowers.find(id => id === participant.memberInfo.memberId) !== 'undefined' &&
                                                        <Image src={borrowerIcon} alt="borrowerIcon" width={24}
                                                               height={24}/>}
                                                    {typeof lenders.find(id => id === participant.memberInfo.memberId) !== 'undefined' &&
                                                        <Image src={lenderIcon} alt="lenderIcon" width={24} height={24}/>}
                                                    {participant.isDrinkAlcohol &&
                                                        <Image src={alcoholIcon} alt="alcoholIcon" width={24} height={24}/>}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={cardStyles.cardInnerLayout.memberCardRightInner}
                                        >
                                            <h3 className={fontStyles.semibold}>{participant.payAmount.toLocaleString('ko-kr')} 원</h3>
                                        </div>
                                    </article>
                                );
                            })}
                            <div className={mainStyles.line}></div>
                        </section>
                        <section>
                            <div>
                                <div className={paymentStyles.dropDownHeader}>
                                    <h3 className={fontStyles.semibold}>결제
                                        내역 {receipt?.totalAmount.toLocaleString('ko-kr')} 원</h3>
                                    <button className="dropDownButton" onClick={onClickReceiptAccordion}>
                                        {isReceiptDropDown ?
                                            <Image src={dropUpIcon} alt="drop up icon" width={40} height={40}/>
                                            :
                                            <Image src={dropDownIcon} alt="drop down icon" width={40} height={40}/>
                                        }
                                    </button>
                                </div>
                            </div>
                            <div
                                className={paymentStyles.tableColumns}
                                style={isReceiptDropDown ? {display: "flex"} : {display: "none"}}
                            >
                                <div>
                                    <p className={paymentStyles.paymentTable.leftHeader}>이름</p>
                                    {receipt?.orderMenus.map((order, index) => {
                                        return (
                                            <p className={`${fontStyles.semibold} ${paymentStyles.tableItems}`} key={index}>{order.menuName}</p>
                                        );
                                    })}
                                </div>
                                <div className={paymentStyles.paymentTable.right}>
                                    <p className={paymentStyles.paymentTable.rightHeader}>가격</p>
                                    {receipt?.orderMenus.map((order, index) => {
                                        return (
                                            <p className={`${fontStyles.semibold} ${paymentStyles.tableItems}`} key={index}>{order.menuPrice.toLocaleString('ko-kr')}</p>
                                        );
                                    })}
                                </div>
                                <div className={paymentStyles.paymentTable.right}>
                                    <p className={paymentStyles.paymentTable.rightHeader}>수량</p>
                                    {receipt?.orderMenus.map((order, index) => {
                                        return (
                                            <p className={`${fontStyles.semibold} ${paymentStyles.tableItems}`} key={index}>{order.quantity}</p>
                                        );
                                    })}
                                </div>
                                <div className={`${paymentStyles.paymentTable.right}`}>
                                    <p className={paymentStyles.paymentTable.rightHeader}>총액</p>
                                    {receipt?.orderMenus.map((order, index) => {
                                        return (
                                            <p className={`${fontStyles.semibold} ${paymentStyles.tableItems}`} key={index}>{order.total.toLocaleString('ko-kr')}</p>
                                        );
                                    })}
                                </div>
                            </div>
                        </section>
                    </main>
                    <div className={`${mainStyles.line} ${paymentStyles.marginBottomLine}`}></div>


                    <button
                        className={`${buttonStyles.mainButton.modalButton} ${fontStyles.bold}`}
                        onClick={changeUserReceiptModalStatus}
                    >확인
                    </button>
                </div>
            </section>
            <section
                className={`${styles.modalBackground} ${isUserReceiptModalOn && styles.modalBackgroundOn}`}
                onClick={changeUserReceiptModalStatus}
            >
            </section>
        </>
    );
}