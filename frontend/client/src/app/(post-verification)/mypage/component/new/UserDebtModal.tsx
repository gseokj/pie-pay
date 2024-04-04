"use client";

import {Debt} from "@/model/user/payments";
import {useStore} from "@/store/useMeetModalStore";
import * as styles from "@/styles/main/mainModal.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import dayjs from "dayjs";
import * as mainStyles from "@/styles/main/main.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import * as modalStyles from "@/styles/main/mainModal.css";
import * as debtStyles from "@/styles/mypage/debt/layout.css";
import {getCookie} from "@/util/getCookie";
import authAxios from "@/util/authAxios";
import {postPayback} from "@/api/user/payment";
import {Meet} from "@/model/meet";
import {useQueryClient} from "@tanstack/react-query";
import {blackLargeFont} from "@/styles/mypage/debt/layout.css";

interface DebtProps {
    props: {
        debt: Debt;
    }
}

export default function UserDebtModal({ props }: DebtProps) {
    const { debt } = props;
    const { isUserDebtModalOn, changeUserDebtModalStatus } = useStore((state) => state);
    const queryClient = useQueryClient();

    const clearDebt = async () => {
        const token = getCookie('accessToken');
        if (token !== null) {
            try {
                await postPayback(debt.payInsteadId ,token);
                console.log('!!!');
                queryClient.setQueryData(['userDebts', token], (oldData: Debt[]) => {
                    const newData = oldData.filter(data => data.payInsteadId !== debt.payInsteadId);
                    return newData
                });
                changeUserDebtModalStatus();
            } catch (error) {
                console.error('Failed to payback', error);
            }
        } else {
            console.error('Failed to get cookie');
        }
    }

    return (
        <>
            <section
                className={`${styles.modalLayout.joinMeetModal} ${isUserDebtModalOn && styles.modalOn}`}
            >
                <div className={styles.modalHandleArea}>
                    <div className={`${styles.modalHandle}`}></div>
                </div>
                <div className={styles.paymentModalContentLayout}>
                    <div
                        className={cardStyles.cardInnerLayout.defaultHeader2}
                    >
                        <h3
                            className={fontStyles.semibold}
                        >정산하기</h3>
                        <p>
                            <span className={`${debtStyles.blackFont} ${fontStyles.semibold}`}>{debt.lenderName}</span>님에게
                            <span className={`${debtStyles.blackFont} ${fontStyles.semibold}`}> {dayjs(debt.createdAt).format("M월 D일")}</span>에 빌린<br/>
                            <span className={`${debtStyles.blackLargeFont} ${fontStyles.semibold}`}>{debt.amount.toLocaleString('ko-kr')}원</span>을 정산할게요
                        </p>
                    </div>
                    <div className={modalStyles.inviteModalButtons}>
                        <button
                            className={`${modalStyles.modalExitButton} ${fontStyles.semibold}`}
                            onClick={changeUserDebtModalStatus}
                        >취소하기
                        </button>
                        <button
                            className={`${buttonStyles.mainButton.modalButton} ${fontStyles.bold}`}
                            onClick={clearDebt}
                        >확인
                        </button>
                    </div>
                </div>
            </section>
            <section
                className={`${styles.modalBackground} ${isUserDebtModalOn && styles.modalBackgroundOn}`}
                onClick={changeUserDebtModalStatus}
            >
            </section>
        </>
    )
}