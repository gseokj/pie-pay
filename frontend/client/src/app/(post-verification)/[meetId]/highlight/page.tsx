"use client";


import {useRouter} from "next/navigation";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";


export default function Highlight() {
    const router = useRouter();

    const onClickBack = () => {
        router.back();
    }

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>하이라이트</h1>
            </header>
        </section>
    );
}
