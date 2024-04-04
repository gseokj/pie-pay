import {MyPayment} from "@/model/user/payments";
import dayjs from "dayjs";
import {useStore} from "@/store/useMeetModalStore";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as buttonStyles from "@/styles/main/mainButton.css";

interface PaymentProps {
    props: {
        payment: MyPayment;
    }
}

export default function UserPaymentCard({ props }: PaymentProps) {
    const {changeUserReceiptModalStatus, setPayId} = useStore((state) => state);
    const { payment } = props;
    const paymentDate = dayjs(payment.updatedAt).format("YYYY.MM.DD");

    const setModal = () => {
        setPayId(payment.payId);
        changeUserReceiptModalStatus();
    }

    return (
        <section
            className={cardStyles.cardLayout.default}
        >
            <div className={cardStyles.cardInnerLayout.paymentHorizontalInner}>
                <p>{paymentDate}</p>
                <h5 className={`${fontStyles.semibold} ${cardStyles.completed}`}>정산 완료</h5>
            </div>
            <div className={cardStyles.cardInnerLayout.paymentVerticalInner}>
                <h5 className={fontStyles.semibold}>{payment.meetName}</h5>
                <h3 className={fontStyles.semibold}>{payment.store.storeName}</h3>
            </div>
            <div className={cardStyles.cardInnerLayout.paymentSpaceBetweenInner}>
                <h3 className={fontStyles.bold}>{payment.payAmount !== null ?
                    `${payment.payAmount.toLocaleString("ko-kr")} 원`
                    :
                    '미정산'
                }</h3>
                <button
                    className={`${buttonStyles.paymentCardButton} ${fontStyles.semibold}`}
                    onClick={setModal}
                >영수증 확인
                </button>
            </div>
        </section>
    );
}