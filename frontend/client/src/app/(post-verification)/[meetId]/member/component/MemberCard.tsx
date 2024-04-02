import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import memberDefaultImage from "@/assets/images/member_default.svg";
import starIcon from "@/assets/icons/star.svg";
import Image from "next/image";
import {MeetMember} from "@/model/meet/member";

type Props = {
    params: { member: MeetMember, category: number, totalPayCount: number, index: number, myId: number|undefined },
}


export default function MemberCard({ params }: Props) {
    const { member, category, totalPayCount, index, myId } = params;

    return (
        <section className={cardStyles.cardLayout.memberCard}>
            <div
                className={cardStyles.cardInnerLayout.memberCardLeftInner}
            >
                <div className={mainStyles.imageBox.imageBox40}>
                    <Image
                        className={mainStyles.imageLayout}
                        src={member.profileImage !== null ?
                            member.profileImage
                            :
                            memberDefaultImage
                        }
                        alt="meet default image"
                        fill={true}
                        sizes="(max-width: 40px)"
                    />
                </div>
                <h5>{myId === member.memberId ? `나 (${member.nickname})` : member.nickname}</h5>
                {category === 1 && member.payTotal !== 0 && index === 0 && <Image src={starIcon} alt="starIcon" width={24} height={24} /> }
                {category === 2 && member.payCount !== 0 && index === 0 && <Image src={starIcon} alt="starIcon" width={24} height={24} /> }
            </div>
            <div
                className={cardStyles.cardInnerLayout.memberCardRightInner}
            >
                {category === 1 && <h3 className={fontStyles.semibold}>{member.payTotal.toLocaleString('ko-kr')} 원</h3>}
                {category === 2 && <h3 className={fontStyles.semibold}>{member.payCount}{typeof totalPayCount !== 'undefined' && <span>/{totalPayCount} 번</span>}</h3>}
            </div>
        </section>
    );
}