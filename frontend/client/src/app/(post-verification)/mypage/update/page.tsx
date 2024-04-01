'use client'

import BackButton from "@/app/(post-verification)/component/BackButton";
import {faker} from "@faker-js/faker";
import circlePen from "@/assets/icons/circlepen.svg"
import pen from "@/assets/icons/pen.svg"
import Image from "next/image";
import dropUp from "@/assets/icons/dropup.svg"
import dropDown from "@/assets/icons/dropdown.svg"
import {Me} from "@/model/member"

import * as styles from "@//styles/mypage/myInfoUpdate.css"
import MyInfoUpdateTextField from '@/app/(post-verification)/mypage/component/MyInfoUpdateTextField';
import MyInfoUpdateSetting from '@/app/(post-verification)/mypage/component/MyInfoUpdateSetting';
import { getMyInfo } from '@/util/getMyInfo';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMe } from '@/api/member';
import { getSession } from 'next-auth/react';
import { cookies } from 'next/headers';
import { getCookie } from '@/util/getCookie';



export default function Update() {
    const queryClient = useQueryClient();
    const myInfo: Me | undefined = queryClient.getQueryData(['me', getCookie('accessToken')]);
    return (<div className={styles.container}>
        <article className={styles.header}>
            <BackButton/>
            <p>계정관리</p>
            <div/>
        </article>

        <div className={styles.imageBox}>
            <img className={styles.image} src={myInfo?.profileImage}/>
            <Image className={styles.imageUpdate} src={circlePen} alt=""/>
        </div>

        <MyInfoUpdateTextField/>
        <MyInfoUpdateSetting/>
    </div>);
}