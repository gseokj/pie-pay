import * as styles from "@/styles/main/MainButton.css";
import * as fontCss from "@/styles/fonts.css";


export default function MeetCreateButton(){
    return (
        <div>
            <button className={`${styles.mainButton.fixedButton} ${fontCss.semibold}`}>
                새로운 모임 만들기
            </button>
        </div>
    );
}