import * as styles from "@/styles/payment/selectedMember.css";
import {faker} from "@faker-js/faker";
import beer from "@/assets/icons/checkbeer.svg"
import Image from "next/image";

interface Props {
    // memberId: number;
    nickname: string;
    profileImage: string;
    // payAgree: boolean;
     isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
    isHost: boolean;
}

export default function SelectedMember({nickname,profileImage,isDrinkAlcohol,isTypeAlcohol,isHost}:Props){
    return(
        <div className={styles.member}>

            <img className={styles.image} src={profileImage} alt="" width={50}/>

            <p className={styles.memberName}>
                {isHost && "나"}
                {!isHost && nickname}
            </p>

            {isDrinkAlcohol&& isTypeAlcohol &&<div className={styles.animationPing}>

        <span className="relative flex h-3 w-3 ">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75">

        </span><Image src={beer} alt=""/></span>
            </div>
            }
        </div>
    );
}