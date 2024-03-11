'use client'

import * as styles from "@/styles/payment/selectMember.css"
import one from "@/assets/icons/payment1.svg";
import SearchNickname from "@/app/(post_verification)/@modal/(.)[meetid]/payment/select/component/SearchNickname";
import SelectedMember from "@/app/(post_verification)/@modal/(.)[meetid]/payment/select/component/SelectedMember";
import MemberList from "@/app/(post_verification)/@modal/(.)[meetid]/payment/select/component/MemberList";
import ListHeader from "@/app/(post_verification)/@modal/(.)[meetid]/payment/select/component/ListHeader";
import Header from "@/app/(post_verification)/@modal/(.)[meetid]/payment/component/Header";
import {faker} from "@faker-js/faker";
import {useEffect, useState} from "react";
import {useMemberFilter} from "@/hooks/useMemberFilter";

const Members = [
    {memberId:1,nickname:"고석주",profileImage:faker.image.avatar()},
    {memberId:2,nickname:"김준수",profileImage:faker.image.avatar()},
    {memberId:3,nickname:"함승찬",profileImage:faker.image.avatar()},
    {memberId:4,nickname:"류지수",profileImage:faker.image.avatar()},
    {memberId:5,nickname:"성목",profileImage:faker.image.avatar()},
    {memberId:6,nickname:"재언",profileImage:faker.image.avatar()},
    {memberId:7,nickname:"류지수",profileImage:faker.image.avatar()},
    {memberId:8,nickname:"성목",profileImage:faker.image.avatar()},
    {memberId:9,nickname:"재언",profileImage:faker.image.avatar()},
    {memberId:10,nickname:"함승찬",profileImage:faker.image.avatar()},
];

const Me = [
    {memberId:1,nickname:"고석주",profileImage:faker.image.avatar()},
];
interface Member {
    memberId: number;
    nickname: string;
    profileImage: string;
    payAgree: boolean;
    isDrinkAlcohol: boolean;
    isTypeAlcohol: boolean;
}
export default function Page() {
    const [selectMembers, setSelectMembers] = useState<Member[]>(Members.map(member => ({
        ...member,
        payAgree: true,
        isDrinkAlcohol: true,
        isTypeAlcohol: false
    })));
    const {filterMembers,setFilterMembers, handleSearchNickname } = useMemberFilter(selectMembers);
    const handleDisagree = (memberId: number) => {
        setFilterMembers(prevMembers => prevMembers.map(member =>
            member.memberId === memberId ? { ...member, payAgree: !member.payAgree } : member
        ));
        setSelectMembers(prevMembers => prevMembers.map(member =>
            member.memberId === memberId ? { ...member, payAgree: !member.payAgree } : member
        ));
    };

    return (
        <div className={styles.container}>
            <Header type={one}/>
            <p className={styles.title}>결제 멤버를 선택해 주세요</p>
            <div className={styles.selectedContainer}>
                {selectMembers.filter(member => member.payAgree === true).map(member => (
                    <SelectedMember
                        key={member.memberId}
                        {...member}
                    />
                ))}
            </div>
            <SearchNickname onSearch={handleSearchNickname}/>
            <hr className={styles.hr}/>
            <div>
                <ListHeader/>
                {filterMembers.map(member => (
                    <MemberList
                        key={member.memberId}
                        {...member}
                        onCheck={() => handleDisagree(member.memberId)}
                    />
                ))}
            </div>
        </div>
    );
}
