import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Debt, MyPayment} from "@/model/user/payments";
import {getCookie} from "@/util/getCookie";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as debtStyles from "@/styles/mypage/debt/layout.css";
import UserPaymentCard from "@/app/(post-verification)/mypage/component/new/UserPaymentCard";
import UserPaymentReceiptModal from "@/app/(post-verification)/mypage/component/new/UserPaymentReceiptModal";
import UserDebtCard from "@/app/(post-verification)/mypage/component/new/UserDebtCard";
import {Me} from "@/model/member";
import UserDebtModal from "@/app/(post-verification)/mypage/component/new/UserDebtModal";
import {useStore} from "@/store/useMeetModalStore";

export default function UserDebtLayout() {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { isUserDebtModalOn, changeUserDebtModalStatus } = useStore((state) => state);

    const [firstItem, setFirstItem] = useState<Debt>();
    const [user, setUser] = useState<Me>();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token !== null) {
            const userDebts: Debt[]|undefined = queryClient.getQueryData(['userDebts', token]);
            const userInfo: Me|undefined = queryClient.getQueryData(['userInfo', token]);
            if (typeof userDebts !== "undefined" && userDebts.length > 0) {
                console.log(userDebts);
                const borrowItem = userDebts.find((debt) => {
                    if (!debt.payback) {
                        return debt
                    }
                })
                setFirstItem(borrowItem);
            }
            if (typeof userInfo !== "undefined") {
                setUser(userInfo);
            }
        }
    }, [isUserDebtModalOn]);

    const onClickPush = () => {
        router.push('/mypage/unsettled');
    }

    if (typeof firstItem !== 'undefined') {
        return (
            <>
                <section className={debtStyles.marginBottom}>
                    <div className={mainStyles.categoryContainer.default}>
                        <h3 className={fontStyles.bold}>미정산 내역</h3>
                        <button
                            className={fontStyles.bold}
                            onClick={onClickPush}
                        >더보기
                        </button>
                    </div>
                    {typeof user !== 'undefined' && typeof firstItem !== 'undefined' &&
                        <UserDebtCard props={{ debt: firstItem, user: user }}/>
                    }
                </section>
                <UserDebtModal />
            </>
        );
    } else {
        return (
            <>
                <section className={debtStyles.marginBottom}>
                    <div className={mainStyles.categoryContainer.default}>
                        <h3 className={fontStyles.bold}>미정산 내역</h3>
                        <button
                            className={fontStyles.bold}
                            onClick={onClickPush}
                        >더보기
                        </button>
                    </div>
                    <p>미정산 내역이 없습니다.</p>
                </section>
            </>
        );
    }
}