import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import Image from "next/image";
import icon from "@/assets/icons/checkbeer.svg";


export default function HighlightCard() {
    const categoryName = "최고의 음식"
    return (
        <div className={ cardStyles.cardLayout.default80 }>
            <div className={ cardStyles.cardInnerLayout.iconHeader}>
                <Image src={icon} alt="icon" width={24} height={24} />
                <h3 className={ fontStyles.semibold }>{ categoryName }</h3>
            </div>
        </div>
    );
}