import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import memberDefaultImage from "@/assets/images/member_default.svg";
import Image from "next/image";
import {MeetMember} from "@/model/meet/member";


type Props = {
    params: { member: MeetMember, category: number, totalPayCount: number|undefined },
}


export default function MemberCard({ params }: Props) {
    const { member, category, totalPayCount } = params;

    return (
        <section className={cardStyles.cardLayout.memberCard}>
            <div
                className={cardStyles.cardInnerLayout.memberCardInner}
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
                <h5>{member.nickname}</h5>
            </div>
                {category === 1 && <h3>{member.payTotal.toLocaleString('ko-kr')}원</h3>}
                {category === 2 && <h3>{member.payCount}번{typeof totalPayCount !== 'undefined' && <span>{totalPayCount}</span>}</h3>}
        </section>
    );
}