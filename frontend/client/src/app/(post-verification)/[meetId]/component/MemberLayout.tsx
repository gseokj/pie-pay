"use client";


import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import Image from "next/image";
import addMemberIcon from "@/assets/icons/addMember.svg";
import moreIcon from "@/assets/icons/moreDots.svg";
import memberDefaultImage from "@/assets/images/member_default.svg";
import {useEffect, useRef, useState} from "react";
import {useRouter} from "next/navigation";
import {Member, MemberResponse} from "@/model/meet";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {MeetMember} from "@/model/meet/member";
import {useStore} from "@/store/useInviteModalStore";


type Props = {
    params: { meetId: string },
}


export default function MemberLayout({params}: Props) {
    const { meetId } = params;
    const changeModalStatus = useStore((state) => state.changeModalStatus)

    const queryClient = useQueryClient();
    const token = getCookie('accessToken');

    const [memberList, setMemberList] = useState<MeetMember[]|undefined>(undefined);
    const containerRef = useRef<HTMLDivElement>(null);
    const [showIcon, setShowIcon] = useState<boolean>(false);
    const [visibleMembers, setVisibleMembers] = useState<MeetMember[]>([]);

    useEffect(() => {
        setMemberList(queryClient.getQueryData(['meetMembers', meetId, token]));
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

            if (typeof memberList !== 'undefined') {
                setVisibleMembers(memberList.slice(0, maxVisibleImages));
                setShowIcon(memberList.length > maxVisibleImages);
            }
        }
    };

    const route = useRouter();
    const onClickPush = () => {
        route.push(`/${meetId}/member`);
    }

    return (
        <section>
            <div className={ mainStyles.categoryContainer.smallMargin }>
                <h5>멤버 {typeof memberList !== 'undefined' && memberList.length}</h5>
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
                    { visibleMembers.map((member: MeetMember) => {
                        return (
                            <div
                                className={ mainStyles.imageBox.imageBox36}
                                key={member.memberId}
                            >
                                <Image
                                    className={ mainStyles.imageLayout }
                                    src={member.profileImage !== null ?
                                        member.profileImage
                                        :
                                        memberDefaultImage
                                    }
                                    alt="member image"
                                    fill={true}
                                    objectFit="cover"
                                    sizes="(max-width: 40px)"
                                    key={member.memberId}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className={ showIcon ? mainStyles.visibility.visible : mainStyles.visibility.invisible }>
                    <Image src={moreIcon} alt="hidden images" height={36} width={36} />
                </div>
                <button
                    className={ buttonStyles.smallButton }
                    onClick={changeModalStatus}
                >
                    <Image src={addMemberIcon} alt="add member" height={24} width={24} />
                </button>
            </div>
        </section>
    );
}