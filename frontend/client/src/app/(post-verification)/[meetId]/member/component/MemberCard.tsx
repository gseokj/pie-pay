import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import Image from "next/image";


export default function MemberCard() {
    return (
        <section className={cardStyles.cardLayout.defaultHorizontal}>
            <div
                className={cardStyles.cardInnerLayout.defaultHorizontal}
            >
                <Image
                    className={mainStyles.imageLayout}
                    src={meetDefaultImage} alt="meet default image" width={40} height={40} />
                <h5>이름</h5>
                <h3>100000 원</h3>
            </div>
        </section>
    );
}