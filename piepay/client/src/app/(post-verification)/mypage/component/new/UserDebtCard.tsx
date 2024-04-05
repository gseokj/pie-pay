import {Debt} from "@/model/user/payments";
import {useStore} from "@/store/useMeetModalStore";
import dayjs from "dayjs";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import {Me} from "@/model/member";

interface DebtProps {
    props: {
        debt: Debt;
        user: Me;
    }
}

export default function UserDebtCard({ props }: DebtProps) {
    const {changeUserDebtModalStatus, setPayInsteadId} = useStore((state) => state);
    const { debt, user } = props;
    const paymentDate = dayjs(debt.createdAt).format("YYYY.MM.DD");

    console.log(debt.lenderName, debt.borrowerName, user.nickname);

    const setModal = () => {
        setPayInsteadId(debt.payInsteadId);
        changeUserDebtModalStatus();
    }

    return (
        <section
            className={cardStyles.cardLayout.default}
        >
            <div className={cardStyles.cardInnerLayout.paymentHorizontalInner}>
                <p>{paymentDate}</p>
                {debt.payback ?
                    <h5 className={`${fontStyles.semibold} ${cardStyles.completed}`}>정산 완료</h5>
                    :
                    <h5 className={`${fontStyles.semibold} ${cardStyles.unpaid}`}>정산 미완료</h5>
                }
            </div>
            {user.nickname === debt.lenderName ?
                <div className={cardStyles.cardInnerLayout.iconHeader2}>
                    <div className={mainStyles.imageBox.imageBox28}>
                        <Image src={debt.borrowerProfile} alt="lender profile" fill={true} objectFit="cover"
                               sizes="(max-width: 28px)"/>
                    </div>
                    <h3 className={fontStyles.semibold}>{debt.borrowerName}님에게 받을 돈이 있어요</h3>
                </div>
                :
                <div className={cardStyles.cardInnerLayout.iconHeader2}>
                    <div className={mainStyles.imageBox.imageBox28}>
                        <Image src={debt.lenderProfile} alt="lender profile" fill={true} objectFit="cover"
                               sizes="(max-width: 28px)"/>
                    </div>
                    <h3 className={fontStyles.semibold}>{debt.lenderName}님에게 갚을 돈이 있어요</h3>
                </div>
            }
            <div className={cardStyles.cardInnerLayout.paymentSpaceBetweenInner}>
                <h3 className={fontStyles.bold}>
                    {`${debt.amount.toLocaleString("ko-kr")} 원`}
                </h3>
                {user.nickname === debt.borrowerName ??
                    <button
                        className={`${buttonStyles.paymentCardButton} ${fontStyles.semibold}`}
                        onClick={setModal}
                    >정산하기
                    </button>
                }
            </div>
        </section>
    )
}