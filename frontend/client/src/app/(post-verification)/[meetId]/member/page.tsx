"use client";


import {ReactNode} from "react";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import backIcon from "@/assets/icons/back.svg";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";
import {faker} from "@faker-js/faker";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

const memberList: Member[] = [
    {
        memberId: 1,
        memberNickname: "kim",
        memberProfile: faker.image.avatar()
    },
    {
        memberId: 2,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },
    {
        memberId: 3,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },
    {
        memberId: 4,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },

    {
        memberId: 5,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },

    {
        memberId: 6,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },
    {
        memberId: 7,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },
    {
        memberId: 8,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },
    {
        memberId: 9,
        memberNickname: "Jay",
        memberProfile: faker.image.avatar()
    },
]

interface Member {
    memberId: number;
    memberNickname: string;
    memberProfile: string;
}

export default function Member({params}: Props) {
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
                <h1 className={fontStyles.bold}>모임 멤버</h1>
            </header>
            <div className={mainStyles.categoryContainer.smallMargin}>
                <h5>멤버 {memberList.length}</h5>
            </div>
        </section>
    );
}