import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";

export default function PaymentLayout() {
    return (
        <section>
            <div className={mainStyles.categoryContainer}>
                <h3 className={fontStyles.bold}>결제 내역</h3>
                <button className={fontStyles.bold}>더보기</button>
            </div>
        </section>
    );
}