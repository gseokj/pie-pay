"use client";


import * as styles from "@/styles/main/cardLayout.css";
import * as mainStyles from "@/styles/main/main.css";
import * as fontCss from "@/styles/fonts.css";
import StarIcon from "@/app/(post-verification)/component/icons/StarIcon";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import memberDefaultImage from "@/assets/images/member_default.svg";
import moreDots from "@/assets/icons/moreDots.svg";
import theme from "@/styles/theme/theme";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {GetMyMeetsResponse, MeetData, Member} from "@/model/meet";
import {fixMeet, getMeetMembers, getMyMeets} from "@/api/meet";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {useEffect, useState} from "react";
import {compareTime} from "@/util/compareTime";


export default function MeetGroup(props : {meetData: MeetData}){
    const { meetData } = props;
    const token = getCookie('accessToken');
    const [isFixed, setIsFixed] = useState(false);
    const queryClient = useQueryClient();

    const { data: members, isLoading, error } = useQuery({queryKey: ['members', meetData.meet.meetId, token], queryFn: getMeetMembers}) ;
    if (error) console.log(error.message);

    useEffect(() => {
        setIsFixed(meetData.topFixed);
    }, []);

    const router = useRouter();
    const enterMeetRoom = () => {
        router.push(`/${meetData.meet.meetId}`);
    }

    const onClickFix = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (typeof token === 'string') {
            await fixMeet(`${meetData.meet.meetId}`, token);
            await queryClient.setQueryData(['myMeets', token], (oldData: MeetData[]) => {
                const newData = oldData.map(meet => {
                    if (meet.meet.meetId === Number(meetData.meet.meetId)) {
                        return {...meet, topFixed: !isFixed};
                    }
                    return meet;
                });
                return newData;
            });
            setIsFixed(!isFixed);
        }
    }

    if (isLoading) {
        return (
            <>
                loading...
            </>
        );
    } else {
        return (
            <>
                <div className={styles.cardLayout.meetGroup} onClick={enterMeetRoom}>
                    <div className={styles.lineLayout.lineOne}>
                        <div className={styles.meetInfo}>
                            <div className={styles.meetImageContainer}>
                                <Image
                                    className={styles.meetImage}
                                    src={meetData.meet.meetImage !== null ?
                                        meetData.meet.meetImage
                                        :
                                        meetDefaultImage
                                    }
                                    alt="meet image" width={40} height={40}/>
                            </div>
                            <div className={styles.meetInfoString}>
                                <h3 className={`${styles.meetName} ${fontCss.semibold}`}>{meetData.meet.meetName}</h3>
                                <p className={styles.meetDate}>{meetData.updated_at !== null && compareTime(meetData.updated_at)}</p>
                            </div>
                        </div>
                        <div>
                            <StarIcon
                                className={mainStyles.top}
                                onClick={onClickFix}
                                color={isFixed ? theme.yellow : theme.lightGray} />
                        </div>
                    </div>
                    <div className={styles.lineLayout.lineTwo}>
                        <div className={styles.profileImagesContainer}>
                            {typeof members !== 'undefined' && members.length > 0 && members.slice(0, 5).map((member: Member) => {
                                return (
                                    <div
                                        className={styles.profileImageContainer}
                                        key={member.memberId}
                                    >
                                        <Image
                                            className={styles.meetMemberImage}
                                            src={member.profileImage !== null ?
                                                member.profileImage
                                                :
                                                memberDefaultImage
                                            }
                                            alt="member image"
                                            fill={true}
                                            sizes="(max-width: 40px)"
                                            key={member.memberId}
                                        />
                                    </div>
                                )
                            })}
                            {meetData.meet.membersCount > 5 ?
                                <>
                                    <Image src={moreDots} alt="dots" width={32} height={32} />
                                    <p className={`${styles.meetMemberNumber} ${fontCss.semibold}`}>{'+' + (meetData.meet.membersCount - 5)}</p>
                                </>
                                : <></>
                            }
                        </div>
                        <button className={`${styles.cardButton.paymentButton} ${fontCss.semibold}`}>바로 결제</button>
                    </div>
                </div>
            </>
        );
    }


}