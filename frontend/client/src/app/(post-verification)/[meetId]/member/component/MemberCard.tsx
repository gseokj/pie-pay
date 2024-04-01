import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import memberDefaultImage from "@/assets/images/member_default.svg";
import Image from "next/image";
import {Member} from "@/model/meet";


type Props = {
    params: { member: Member },
}


export default function MemberCard({ params }: Props) {
    const { member } = params;

    return (
        <section className={cardStyles.cardLayout.defaultHorizontal}>
            <div
                className={cardStyles.cardInnerLayout.defaultHorizontal}
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
                <h3>{member.payTotal}원</h3>
                <h3>{member.payCount}번</h3>
            </div>
        </section>
    );
}