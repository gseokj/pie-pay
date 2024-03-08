'use client'

import BackButton from "@/app/(pre-verification)/component/BackButton";
import {useRouter} from "next/navigation";

export default function Auth() {

    const router = useRouter();

    const onClickButton = (path: string) => {
        if (path === "account") router.push("/account")

    }
    return (

        <>
            <BackButton/>
            <button type="button" onClick={() => onClickButton("account")} className="border-2 p-5">계좌테스트</button>
            Auth Page
        </>
    );
}