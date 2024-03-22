import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import addImageIcon from "@/assets/icons/addImage.svg";
import Image from "next/image";


export default function SelectMeetImageCard() {
    return (
        <section
            className={ cardStyles.cardLayout.furtherPadding }
        >
            <div
                className={ cardStyles.cardInnerLayout.imageInner }
            >
                <Image
                    src={addImageIcon}
                    alt="add image"
                    width={48}
                    height={48}
                />
            </div>
            <div
                className={ cardStyles.cardInnerLayout.marginTopHeader }
            >
                <h3
                    className={ fontStyles.semibold }
                >모임 이미지 선택</h3>
                <p>
                    모임 이미지가 없습니다<br/>
                    이미지나 아이콘으로 모일을 표현해 보세요
                </p>
            </div>
        </section>
    );
}