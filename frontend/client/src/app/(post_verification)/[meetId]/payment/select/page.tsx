'use client'

import * as styles from "@/styles/payment/select/selectMember.css"
import one from "@/assets/icons/payment1.svg";
import SearchNickname from "@/app/(post_verification)/[meetId]/payment/select/component/SearchNickname";
import SelectedMember from "@/app/(post_verification)/[meetId]/payment/select/component/SelectedMember";
import MemberList from "@/app/(post_verification)/[meetId]/payment/select/component/MemberList";
import ListHeader from "@/app/(post_verification)/[meetId]/payment/select/component/ListHeader";
import Header from "@/app/(post_verification)/[meetId]/payment/component/Header"
import {faker} from "@faker-js/faker";
import {useMemberFilter} from "@/hooks/useMemberFilter";
import {useEffect} from "react";
import {useQueryClient} from "@tanstack/react-query";
import ParticipateButton from "@/app/(post_verification)/[meetId]/payment/select/component/ParticipateButton";

const Members = [
    {memberId: 1, nickname: "고석주", profileImage: faker.image.avatar()},
    {memberId: 2, nickname: "김준수", profileImage: faker.image.avatar()},
    {memberId: 3, nickname: "함승찬", profileImage: faker.image.avatar()},
    {memberId: 4, nickname: "류지수", profileImage: faker.image.avatar()},
    {memberId: 5, nickname: "성목", profileImage: faker.image.avatar()},
    {memberId: 6, nickname: "재언", profileImage: faker.image.avatar()},
    {memberId: 7, nickname: "고석주", profileImage: faker.image.avatar()},
    {memberId: 8, nickname: "김준수", profileImage: faker.image.avatar()},
    {memberId: 9, nickname: "함승찬", profileImage: faker.image.avatar()},
    {memberId: 10, nickname: "류지수", profileImage: faker.image.avatar()},
    {memberId: 11, nickname: "성목", profileImage: faker.image.avatar()},
    {memberId: 12, nickname: "재언", profileImage: faker.image.avatar()},
];
const Me =
    {memberId: 2, nickname: "김준수", profileImage: faker.image.avatar()}

const copyMembers = Members.map(member => ({
    ...member,
    payAgree: true,
    isDrinkAlcohol: true,
    isTypeAlcohol: false,
    isSelected: true,
    isFiltered: true,
    isHost: false,
}));
type Props = {
    params: { meetId: string },
}
export default function Page({params}:Props) {

    const {meetId} = params;
    const queryClient = useQueryClient();
    const Members = queryClient.getQueryData(["meetId",meetId]);
    const {filterMembers, handleSearchNickname, handleType, handleCheck, setHost} = useMemberFilter(copyMembers);



    useEffect(() => {
        setHost(Me.memberId);

    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.progress}>
                <Header type={one}/>
            </div>
            <div className={styles.contentContainer}>
                <div className={styles.headerContainer}>
                    <p className={styles.title}>결제 멤버를 선택해 주세요</p>
                </div>
                <div className={styles.listHeaderContainer}>
                    <div className={styles.selectedContainer}>
                        {filterMembers.filter(member => member.isSelected).sort((a, b) => (a.isHost === b.isHost) ? 0 : a.isHost ? -1 : 1).map(member => (
                            <SelectedMember key={member.memberId} {...member} />
                        ))}
                    </div>
                    <SearchNickname onSearch={handleSearchNickname}/>
                    <hr className={styles.hr}/>

                    {<ListHeader onType={handleType} isAlcohol={filterMembers[0].isTypeAlcohol}
                                 total={filterMembers.filter(member => member.isFiltered).length}/>}
                </div>
                <div className={styles.memberContainer}>
                    {filterMembers.filter(member => member.isFiltered)
                        .sort((a, b) => (a.isHost === b.isHost) ? 0 : a.isHost ? -1 : 1)
                        .map(member => (
                            <MemberList
                                key={member.memberId}
                                {...member}
                                onCheck={() => handleCheck(member.memberId, "payAgree")}
                                onCheckAlcohol={() => handleCheck(member.memberId, "isDrinkAlcohol")}
                            />
                        ))}

                <ParticipateButton meetId={meetId}/>
                </div>
            </div>
        </div>
    );
}