'use client'

import * as styles from "@/styles/payment/result/participantResultList.css";
import {useMemberFilter} from "@/store/useMemberFilter";
import {useQuery} from "@tanstack/react-query";
import {getPayment} from "@/api/payment";
import {useEffect, useState} from "react";
import {Participant} from "@/model/participant";
import ProgressSpiner from "@/app/(post-verification)/component/ProgressSpiner";
type Props= {
    payId:string;
}
export default function ParticipantResultList({payId}:Props) {
    const { data: payment, isLoading, error } = useQuery({queryKey: ['payId',payId], queryFn: getPayment}) ;
    const [participants, setParticipants] = useState<Participant[]>([]);
    useEffect(() => {
        if(!payment) return;
        setParticipants(payment?.participants);
    }, []);
    return (

        <div className={styles.participantContainer}>
            {participants.map(participant => (
                    <div key={participant.participantId}
                         className={`${styles.container}  ${participant.payAgree == "agree" && styles.backgroundSkyBlue}`}>
                        <div className={styles.participantList}>
                            <img className={styles.image} src={participant.memberInfo.profileImage} alt="" width={50}/>
                            <p>{participant.memberInfo.nickname}</p>

                        </div>
                        {participant.payAgree=="await" && <ProgressSpiner/>}

                    </div>

                )
            )}
        </div>
    )
}
