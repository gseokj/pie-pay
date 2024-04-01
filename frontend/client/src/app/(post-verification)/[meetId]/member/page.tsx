"use client";


import {ReactNode} from "react";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";
import MemberCard from "@/app/(post-verification)/[meetId]/member/component/MemberCard";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {Member} from "@/model/meet";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}


export default function Members({params}: Props) {
    const {meetId} = params;
    const router = useRouter();
    const queryClient = useQueryClient();
    const token = getCookie('accessToken');

    const memberList: Member[]|undefined  = queryClient.getQueryData(['members', meetId, token])

    const onClickBack = () => {
        router.back();
    }

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>모임 멤버</h1>
            </header>
            <div className={mainStyles.categoryContainer.smallMargin}>
                <h5>멤버 {typeof memberList !== 'undefined' && memberList.length}</h5>
            </div>
            {typeof memberList !== 'undefined' && memberList.map((member: Member) => {
                return (
                    <MemberCard params={{ member }} key={ member.memberId } />
                );
            })}
        </section>
    );
}