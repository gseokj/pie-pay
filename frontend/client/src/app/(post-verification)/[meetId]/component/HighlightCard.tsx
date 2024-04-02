import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as highlightStyles from "@/styles/meet/meetHighlights.css";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import icon from "@/assets/icons/checkbeer.svg";
import totalPayAmountIcon from "@/assets/icons/totalPayAmount.svg";
import meetLeaderIcon from "@/assets/icons/meetLeader.svg";
import coinsIcon from "@/assets/icons/coins.svg";
import {Highlight} from "@/model/meet/highlight";

type HighlightProps = {
    props: {
        highlight: Highlight;
        category: "모임횟수"|"최다참석자"|"지출총액"|"평균지출"|"모임추이"|"최다카테고리"|"술";
        type: "리스트"|"카드"
    }
}

export default function HighlightCard({ props }: HighlightProps) {
    const { highlight, category, type } = props;
    const categoryName = "최고의 음식"

    if (category === "최다참석자" && type === "리스트") {

        return (
            <div className={highlightStyles.listCardLayout}>
                <div className={highlightStyles.listIconHeader}>
                    <Image src={meetLeaderIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>최다 참석자</h3>
                </div>
                <div className={highlightStyles.listBody}>
                    <div className={mainStyles.imageBox.imageBox56}>
                        <Image
                            src={highlight.mostAttendingMember.profileImage}
                            alt="member profile"
                            fill={true}
                            objectFit="cover"
                            sizes="(max-width: 56px)"
                        />
                    </div>
                    <div className={highlightStyles.listInfo}>
                        <p className={fontStyles.medium}>{highlight.mostAttendingMember.nickname}</p>
                        <h2 className={fontStyles.semibold}>{highlight.memberAttendingCount}
                            <span className={`${highlightStyles.listInfoAdd} ${fontStyles.reqular}`}>회 참여</span>
                        </h2>
                    </div>
                </div>
            </div>
        );

    } else if (category === "지출총액" && type === "리스트") {

        return (
            <div className={highlightStyles.listCardLayout}>
                <div className={highlightStyles.listIconHeader}>
                    <Image src={totalPayAmountIcon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>모임 지출 총액</h3>
                </div>
                <div className={`${highlightStyles.listBodyOne} ${fontStyles.semibold}`}>
                    <Image src={coinsIcon} alt="icon" width={24} height={24}/>
                    {highlight.totalPayment.toLocaleString('ko-kr')} 원
                    <Image src={coinsIcon} alt="icon" width={24} height={24}/>
                </div>
            </div>
        );

    } else {
        console.log('잘못된 type | category');
        return (
            <div className={cardStyles.cardLayout.default80}>
                <div className={cardStyles.cardInnerLayout.iconHeader}>
                    <Image src={icon} alt="icon" width={24} height={24}/>
                    <h3 className={fontStyles.semibold}>{categoryName}</h3>
                </div>
            </div>
        );
    }

}