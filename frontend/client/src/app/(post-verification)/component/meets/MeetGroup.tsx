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
import {fixMeet} from "@/api/meet";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {useEffect, useState} from "react";
import {compareTime} from "@/util/compareTime";
import {Meet} from "@/model/meet/meets";


interface MeetGroupProps {
    meet: Meet;
    updateIsFixed: ()=>void;
}


export default function MeetGroup({ meet, updateIsFixed }: MeetGroupProps){
    const token = getCookie('accessToken');
    const [isFixed, setIsFixed] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        setIsFixed(meet.topFixed);
    }, []);

    const router = useRouter();
    const enterMeetRoom = () => {
        router.push(`/${meet.meetId}`);
    }

    const onClickFix = async (event: React.MouseEvent) => {
        event.stopPropagation();
        if (typeof token === 'string') {
            await fixMeet(`${meet.meetId}`, token);
            await queryClient.setQueryData(['meetList', token], (oldData: Meet[]) => {
                const newData = oldData.map(meet => {
                    if (meet.meetId === Number(meet.meetId)) {
                        return {...meet, topFixed: !isFixed};
                    }
                    return meet;
                });
                return newData;
            });
            setIsFixed(!isFixed);
            updateIsFixed();
        }
    }

    const onClickPushPayment = (event: React.MouseEvent) => {
        event.stopPropagation();
        router.push(`/${meet.meetId}/payment/select`);
    }
    return (
        <>
            <div className={styles.cardLayout.meetGroup} onClick={enterMeetRoom}>
                <div className={styles.lineLayout.lineOne}>
                    <div className={styles.meetInfo}>
                        <div className={mainStyles.imageBox.imageBox40}>
                            <Image
                                className={styles.meetImage}
                                src={meet.meetImage !== null ?
                                    meet.meetImage
                                    :
                                    meetDefaultImage
                                }
                                alt="meet image"
                                fill={true}
                                objectFit="cover"
                                sizes="(max-width: 40px)"
                            />
                        </div>
                        <div className={styles.meetInfoString}>
                            <h3 className={`${styles.meetName} ${fontCss.semibold}`}>{meet.meetName}</h3>
                            {meet.lastPayDate !== null ?
                                <p className={styles.meetDate}>{`${compareTime(meet.lastPayDate)} 결제`}</p>
                                :
                                <p className={styles.meetDate}>{`${meet.createdAt !== null && compareTime(meet.createdAt)} 참여`}</p>
                            }
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
                        {meet.member.length > 0 && meet.member.slice(0, 5).map((member, index) => {
                            return (
                                <div
                                    className={styles.profileImageContainer}
                                    key={index}
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
                                        key={index}
                                    />
                                </div>
                            )
                        })}
                        {meet.membersCount > 5 ?
                            <>
                                <Image src={moreDots} alt="dots" width={32} height={32} />
                                <p className={`${styles.meetMemberNumber} ${fontCss.semibold}`}>{'+' + (meet.membersCount - 5)}</p>
                            </>
                            : <></>
                        }
                    </div>
                    <button className={`${styles.cardButton.paymentButton} ${fontCss.semibold}`} onClick={onClickPushPayment}>바로 결제</button>
                </div>
            </div>
        </>
    );
}