import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import dayjs from "dayjs";
import {Payment} from "@/model/meet/payment";
import {Meet} from "@/model/meet";


interface PaymentProps {
    props: {
        payment: Payment;
        meetInfo: Meet;
    }
}


export default function PaymentCard({ props }: PaymentProps) {
    const { payment, meetInfo } = props;
    const paymentDate = dayjs(payment.updatedAt).format("YYYY.MM.DD")

    return (
        <section
            className={ cardStyles.cardLayout.default }
        >
            <div className={ cardStyles.cardInnerLayout.paymentHorizontalInner }>
                <p>{ paymentDate }</p>
                <h5 className={ `${fontStyles.semibold} ${payment.payStatus === "COMPLETE" ? cardStyles.completed : cardStyles.unpaid}` }>{payment.payStatus === "COMPLETE" ? "정산 완료" : "정산 미완료"}</h5>
            </div>
            <div className={ cardStyles.cardInnerLayout.paymentVerticalInner }>
                <h5 className={ fontStyles.semibold }>{ meetInfo.meetName }</h5>
                <h3 className={ fontStyles.semibold }>{ payment.orders.store.storeName }</h3>
            </div>
            <div className={ cardStyles.cardInnerLayout.paymentSpaceBetweenInner }>
                <h3 className={ fontStyles.bold }>{payment.totalPayAmount !== null ?
                    `${payment.totalPayAmount.toLocaleString("ko-kr")} 원`
                    :
                    '미정산'
                }</h3>
                <button className={ `${ buttonStyles.cardButton } ${ fontStyles.semibold }` }>영수증 확인</button>
            </div>
        </section>
    );
}