import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import {PaymentHistory} from "@/app/(post-verification)/[meetId]/component/PaymentLayout";
import dayjs from "dayjs";


interface PaymentProps {
    props: PaymentHistory;
}


export default function PaymentCard({ props }: PaymentProps) {
    const paymentDate = dayjs(props.createdAt).format("YYYY.MM.DD")

    return (
        <section
            className={ cardStyles.cardLayout.default }
        >
            <div className={ cardStyles.cardInnerLayout.paymentHorizontalInner }>
                <p>{ paymentDate }</p>
                <h5 className={ `${fontStyles.semibold} ${props.isClear ? cardStyles.completed : cardStyles.unpaid}` }>{ props.isClear ? "정산 완료" : "정산 미완료"}</h5>
            </div>
            <div className={ cardStyles.cardInnerLayout.paymentVerticalInner }>
                <h5 className={ fontStyles.semibold }>{ props.meetName }</h5>
                <h3 className={ fontStyles.semibold }>{ props.storeName }</h3>
            </div>
            <div className={ cardStyles.cardInnerLayout.paymentSpaceBetweenInner }>
                <h3 className={ fontStyles.bold }>{ `${props.totalMoney.toLocaleString("ko-kr")} 원` }</h3>
                <button className={ `${ buttonStyles.cardButton } ${ fontStyles.semibold }` }>영수증 확인</button>
            </div>
        </section>
    );
}