'use client';

import * as styles from '@/styles/mypage/myInfo.css';
import Image from 'next/image';
import setting from '@/assets/icons/setting.svg';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Me, Member } from '@/model/member';
import { getMyInfo } from '@/util/getMyInfo';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from '@/util/getCookie';
import PulseMember from '@/app/(post-verification)/mypage/component/PulseMember';

export default function MyInfo() {
  const queryClient = useQueryClient();
  const myInfo: Me | undefined = queryClient.getQueryData([
    'me',
    getCookie('accessToken'),
  ]);
  const route = useRouter();
  const updateMember = () => {
    route.push('/mypage/update');
  };
  return (
    <section className={styles.userInfoSection}>
      {myInfo ? (
        <>
          <div className={styles.userInfoContent}>
            <img className={styles.userImage} src={myInfo.profileImage} />
            <div className={styles.userInfoBox}>
              <p className="nickname">{myInfo.nickname}</p>
              <p className="text-xs text-gray-500">{myInfo.phoneNumber}</p>
            </div>
          </div>
          <div>
            <Image
              onClick={updateMember}
              className={styles.cursorPointer}
              src={setting}
              alt="톱니바퀴"
            />
          </div>
        </>
      ) : (
        <PulseMember />
      )}
    </section>
  );
}
