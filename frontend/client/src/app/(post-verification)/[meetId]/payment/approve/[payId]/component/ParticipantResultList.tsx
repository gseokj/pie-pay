'use client'

import * as styles from "@/styles/payment/result/participantResultList.css";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Participant, Payment} from "@/model/participant";
import hand from "@/assets/icons/hand.svg";
import resultbeer from "@/assets/icons/resultbeer.svg";
import resultprofile from "@/assets/icons/resultprofile.svg";
import Image from "next/image";
import {getPayment, getPaymentResult} from "@/api/payment";
import {Receipt} from "@/model/receipt";

type Props = {
    payId: number;
}
export default function ParticipantResultList({payId}: Props) {
    const queryClient = useQueryClient();
    const payment: Payment|undefined = queryClient.getQueryData(['result', payId]);
    console.log(payment);

    return (

        <div className={styles.participantContainer}>

            <p className={styles.pargraph.paymentMember}>결제 멤버 {payment?.participants.length}</p>
            {payment?.participants.map(participant => (
                    <div key={participant.participantId}
                         className={`${styles.container}  ${participant.payAgree && styles.backgroundSkyBlue} ${participant.payAgree && styles.backgroundLightRed}`}>
                        <div className={styles.participantList}>
                            <img className={styles.image} src={participant.memberInfo.profileImage} alt="" width={50}/>
                            <p>{participant.memberInfo.nickname}</p>
                            {participant.payAgree && <Image src={resultprofile} alt=""/>}
                            {participant.payAgree && <Image src={hand} alt=""/>}
                            {participant.isDrinkAlcohol && <Image src={resultbeer} alt=""/>}

                        </div>
                        <p className={styles.pargraph.balance}>
                            {participant.payAmount ? participant.payAmount.toLocaleString() + " 원" : "0 원"}
                        </p>
                    </div>

                )
            )}
        </div>
    )
}
