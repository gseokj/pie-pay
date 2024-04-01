"use client";


import { useRouter } from "next/navigation";
import Image from "next/image";
import QRIcon from "@/assets/icons/qr.svg";
import * as buttonStyles from "@/styles/main/mainButton.css";
import * as fontStyles from "@/styles/fonts.css";


interface PaymentSelectProps {
    meetId: string;
}


export default function PaymentSelectButton(
    { meetId }: PaymentSelectProps) {

    const router = useRouter();
    const onClickPush = () => {
        router.push(`/${meetId}/payment/select`);
    }

    return (
        <button
            className={ `
                ${buttonStyles.mainButton.fixedButton}
                ${buttonStyles.buttonFeatures.withIcon}
                ${fontStyles.bold}
                ` }
            onClick={ onClickPush }
        >
            <Image
                src={ QRIcon }
                alt="QR code Icon"
                width={24}
                height={24}
            />
            결제 QR 생성
        </button>
    );
}