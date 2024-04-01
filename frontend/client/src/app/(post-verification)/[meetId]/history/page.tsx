"use client";


import {ReactNode} from "react";
import {useRouter} from "next/navigation";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

export default function History({params}: Props) {
    const {meetId} = params;
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
                <h1 className={fontStyles.bold}>결제 내역</h1>
            </header>
        </section>
    );
}