"use client";

import * as mainStyles from "@/styles/main/main.css";
import BankAccount from "@/app/(post-verification)/component/BankAccount";

export default function AccountLayout() {
    return (
        <section>
            <div className={mainStyles.categoryContainer.smallMargin}>
                <h5>내 계좌</h5>
            </div>
            <BankAccount />
        </section>
    );
}