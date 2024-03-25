"use client";


import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import HighlightCard from "@/app/(post-verification)/[meetId]/component/HighlightCard";
import {useRouter} from "next/navigation";


interface HighlightProps {
    meetId: string;
}

export default function HighlightLayout({ meetId }: HighlightProps) {
    const router = useRouter();

    const onClickPush = () => {
        router.push(`/${meetId}/history`);
    };
    return (
        <section style={{ marginBottom: "80%"}}>
            <div className={mainStyles.categoryContainer.default}>
                <h3 className={fontStyles.bold}>하이라이트</h3>
                <button className={fontStyles.bold}>더보기</button>
            </div>
            <div className={ cardStyles.highlightCardContainer }>
                <HighlightCard />
                <HighlightCard />
            </div>
        </section>
    );
}