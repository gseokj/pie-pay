"use client";


import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import HighlightCard from "@/app/(post-verification)/[meetId]/component/HighlightCard";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Highlight} from "@/model/meet/highlight";
import {getCookie} from "@/util/getCookie";


type Props = {
    params: {
        meetId: string;
    }
}

export default function HighlightLayout({ params }: Props) {
    const { meetId } = params;
    const router = useRouter();
    const queryClient = useQueryClient();
    const [highlight, setHighlight] = useState<Highlight>();

    useEffect(() => {
        const token = getCookie('accessToken');
        setHighlight(queryClient.getQueryData(['meetHighlights', meetId, token]));
    }, []);

    const onClickPush = () => {
        router.push(`/${meetId}/highlight`);
    };

    if (typeof highlight !== 'undefined') {
        return (
            <section style={{ marginBottom: "80%"}}>
                <div className={ mainStyles.categoryContainer.default }>
                    <h3 className={ fontStyles.bold }>하이라이트</h3>
                    <button
                        className={ fontStyles.bold }
                        onClick={ onClickPush }
                    >더보기</button>
                </div>
                <div className={ cardStyles.highlightCardContainer }>
                    <HighlightCard props={{ highlight, category: '지출총액', type: "리스트" }} />
                    <HighlightCard props={{ highlight, category: '최다참석자', type: "리스트" }} />
                </div>
            </section>
        );
    }
}