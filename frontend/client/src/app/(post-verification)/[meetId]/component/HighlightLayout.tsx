import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";

export default function HighlightLayout() {
    return (
        <>
            <div className={mainStyles.categoryContainer}>
                <h3 className={fontStyles.bold}>하이라이트</h3>
                <button className={fontStyles.bold}>더보기</button>
            </div>
        </>
    );
}