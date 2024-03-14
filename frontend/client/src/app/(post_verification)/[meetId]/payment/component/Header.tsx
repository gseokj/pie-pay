import * as styles from "@/styles/payment/select/selectMember.css";
import BackButton from "@/app/(pre-verification)/component/XBackButton";
import Image from "next/image";

type Props = ({
    type: HTMLImageElement;
});

export default function Header({type}: Props) {
    return (
        <div>
            <div className={styles.header}>
                <BackButton/>
                <Image src={type} alt=""/>
                <div/>
            </div>
        </div>
    );
}