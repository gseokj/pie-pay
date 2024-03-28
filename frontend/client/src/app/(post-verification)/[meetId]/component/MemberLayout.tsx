"use client";


import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import {faker} from "@faker-js/faker";
import Image from "next/image";
import addMemberIcon from "@/assets/icons/addMember.svg";
import moreIcon from "@/assets/icons/moreDots.svg";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";


interface MemberProps {
    meetId: string;
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


export default function MemberLayout({ meetId }: MemberProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const [visibleMembers, setVisibleMembers] = useState<Member[]>([]);

    useEffect(() => {
        calculateHiddenImages();
        window.addEventListener('resize', calculateHiddenImages);

        return () => {
            window.removeEventListener('resize', calculateHiddenImages);
        };
    }, [memberList]);

    const calculateHiddenImages = () => {
        if (containerRef.current) {
            const containerWidth = containerRef.current.offsetWidth;
            const imageWidth = 36;
            const maxVisibleImages = Math.floor(containerWidth / imageWidth);

            setVisibleMembers(memberList.slice(0, maxVisibleImages));
            setShowIcon(memberList.length > maxVisibleImages);
        }
    };

    const route = useRouter();
    const onClickPush = () => {
        route.push(`/${meetId}/member`);
    }

    return (
        <section>
            <div className={ mainStyles.categoryContainer.smallMargin }>
                <h5>멤버 {memberList.length}</h5>
                <button
                    className={ fontStyles.bold }
                    onClick={onClickPush}
                >더보기</button>
            </div>
            <div className={ mainStyles.containers.profileContainer }>
                <div
                    ref={containerRef}
                    className={ mainStyles.containers.imageContainer }
                >
                    { visibleMembers.map((member) => {
                        return <img
                            className={ mainStyles.imageLayout }
                            src={member.memberProfile}
                            alt="member image"
                            height={36} width={36}
                            key={member.memberId}
                        />
                    })}
                </div>
                <div className={ showIcon ? mainStyles.visibility.visible : mainStyles.visibility.invisible }>
                    <Image src={moreIcon} alt="hidden images" height={36} width={36} />
                </div>
                <button
                    className={ buttonStyles.smallButton }
                >
                    <Image src={addMemberIcon} alt="add member" height={24} width={24} />
                </button>
            </div>
        </section>
    );
}