import * as styles from "@/styles/payment/background.css";
import XBackButton from "@/app/(post-verification)/component/XBackButton";

export default function QRBackground(){
    return(<div className={styles.container}><div><XBackButton/></div></div>);
}