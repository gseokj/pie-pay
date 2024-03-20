import * as styles from "@/styles/main/MainButton.css";
import * as fontCss from "@/styles/fonts.css";

export default function MeetJoinButton() {
    return (
        <button className={`${styles.mainButton.bottomButton} ${fontCss.semibold}`}>모임 입장하기</button>
    );
}