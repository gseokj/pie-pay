"use client";


import {useRouter} from "next/navigation";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";
import * as highlightStyles from "@/styles/meet/meetHighlights.css";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {Highlight} from "@/model/meet/highlight";
import HighlightCard from "@/app/(post-verification)/[meetId]/component/HighlightCard";
import {Payment} from "@/model/meet/payment";


type Props = {
    params: { meetId: string },
}

export default function Highlight({params}: Props) {
    const {meetId} = params;
    const router = useRouter();
    const queryClient = useQueryClient();
    const [highlights, setHighlights] = useState<Highlight>();
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        const token = getCookie('accessToken');
        const meetHighlight: Highlight|undefined = queryClient.getQueryData(['meetHighlights', meetId, token]);
        const meetPayments: Payment[]|undefined = queryClient.getQueryData(['meetPayments', meetId, token]);
        if (typeof meetHighlight !== "undefined" && typeof meetPayments !== "undefined") {
            setHighlights(meetHighlight);
            setPayments(meetPayments);
            console.log(meetHighlight);
        }
    }, []);

    const onClickBack = () => {
        router.back();
    }

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>하이라이트</h1>
            </header>
            {typeof highlights !== 'undefined' &&
                <div>
                    <HighlightCard props={{ highlight: highlights, category: "모임추이", type: "카드"  }} />
                    <HighlightCard props={{ highlight: highlights, category: "지출총액", type: "카드"  }} />
                    <div className={highlightStyles.rowTwoLayout}>
                        <HighlightCard props={{ highlight: highlights, category: "평균지출", type: "카드"  }} />
                        <HighlightCard props={{ highlight: highlights, category: "최다참석자", type: "카드"  }} />
                    </div>
                    <HighlightCard props={{ highlight: highlights, payments: payments, category: "최다카테고리", type: "카드"  }} />
                    <HighlightCard props={{ highlight: highlights, category: "술", type: "카드"  }} />
                </div>
            }
        </section>
    );
}
