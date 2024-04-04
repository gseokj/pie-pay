import {StoreInfo} from "@/model/meet/payment";

interface Debt {
    payInsteadId: number;
    borrowerName: string;
    borrowerProfile: string;
    lenderName: string
    lenderProfile: string;
    amount: number;
    payback: boolean;
    createdAt: string;
}

interface MyPayment {
    participantId: number;
    payId: number;
    meetName: string;
    payAmount: number;
    updatedAt: string;
    store: StoreInfo;
    drinkAlcohol: boolean;
}

export type {
    Debt,
    MyPayment,
}