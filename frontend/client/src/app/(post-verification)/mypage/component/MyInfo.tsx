'use client'

import * as styles from '@/styles/mypage/myInfo.css'
import Image from 'next/image';
import setting from '@/assets/icons/setting.svg';
import React from 'react';
import { useRouter } from 'next/navigation';
import {Me, Member} from '@/model/member';

export default function MyInfo(){
  const myInfo:Me = JSON.parse(sessionStorage.getItem("myInfo")!);
  const route =useRouter();
  const updateMember = () => route.push('mypage/update');
  // const myInfoCookie = document.cookie.split('; ').find(row => row.startsWith('myInfo='));
  // let myInfo:Member;
  // if (myInfoCookie) {
  //   const decodedCookie = decodeURIComponent(myInfoCookie.split('=')[1]);
  //   myInfo = JSON.parse(decodedCookie);
  // }
  return (<section className={styles.userInfoSection}>
    <div className={styles.userInfoContent}>
      <img className={styles.userImage} src={myInfo.profileImage} />
      <div className={styles.userInfoBox}>
        <p className="nickname">{myInfo.nickname}</p>
        <p className="text-xs text-gray-500">{myInfo.phoneNumber}</p>
      </div>
    </div>
    <div>
      <Image onClick={updateMember} className="cursor-pointer" src={setting} alt="톱니바퀴" />
    </div>
  </section>)
}