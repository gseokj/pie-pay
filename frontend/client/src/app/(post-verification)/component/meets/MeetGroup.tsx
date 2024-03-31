"use client";


import * as styles from "@/styles/main/cardLayout.css";
import * as fontCss from "@/styles/fonts.css";
import StarIcon from "@/app/(post-verification)/component/icons/StarIcon";
import meetDefaultImage from "@/assets/images/meet_defualt.png";
import memberDefaultImage from "@/assets/images/member_default.svg";
import moreDots from "@/assets/icons/moreDots.svg";
import theme from "@/styles/theme/theme";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {GetMyMeetsResponse, MeetData, Member} from "@/model/meet";
import {getMeetMembers, getMyMeets} from "@/api/meet";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {useEffect, useState} from "react";
import {getAccount} from "@/api/account";


export default function MeetGroup(props : {meetData: MeetData}){
    // const [members, setMembers] = useState<Member[]>([]);
    const { meetData } = props;
    const token = getCookie('accessToken');
    console.log(`inside.... ${meetData.meet.meetId}, ${meetData.meet}`);

    const { data: members, isLoading, error } = useQuery({queryKey: ['account', meetData.meet.meetId, token], queryFn: getMeetMembers}) ;
    if (error) console.log(error.message);
    console.log(members?.result);
    console.log(`${typeof members !== 'undefined'}, ${typeof members !== 'undefined' && members.result.length > 0}`)

    // useEffect(() => {
    //     // getMembers();
    //     console.log('!!!!!!!!!', members);
    // }, [])

    const router = useRouter();
    const enterMeetRoom = () => {
        router.push(`/${meetData.meet.meetId}`);
    }

    // const getMembers = async () => {
    //     const queryClient = useQueryClient();
    //     await queryClient.prefetchQuery({queryKey: ['meet', meetData.meet.meetId, token], queryFn: getMeetMembers});
    //     const response: Member[]|undefined = queryClient.getQueryData(['myMeets', meetData.meet.meetId, token]);
    //     if (typeof response !== 'undefined') {
    //         setMembers(response);
    //     }
    // };

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
                                    src={`${meetData.meet.meetImage !== null ?
                                        meetData.meet.meetImage
                                        :
                                        meetDefaultImage
                                    }`} alt="meet image" width={40} height={40}/>
                            </div>
                            <div className={styles.meetInfoString}>
                                <h3 className={`${styles.meetName} ${fontCss.semibold}`}>{meetData.meet.meetName}</h3>
                                <p className={styles.meetDate}>{meetData.meet.updatedAt}</p>
                            </div>
                        </div>
                        <div>
                            <StarIcon color={meetData.topFixed ? theme.yellow : theme.lightGray} />
                        </div>
                    </div>
                    <div className={styles.lineLayout.lineTwo}>
                        <div className={styles.profileImageContainer}>
                            {typeof members !== 'undefined' && members.result.length > 0 && members.result.slice(0, 5).map((member: Member) => {
                                return (
                                    <img
                                        className={styles.meetMemberImage}
                                        src={member.profileImage !== null ?
                                            member.profileImage
                                            :
                                            memberDefaultImage
                                        }
                                        alt="member image"
                                        width={24} height={24}
                                        key={member.memberId}
                                    />
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