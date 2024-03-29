'use client'

import * as styles from '@/styles/mypage/myInfoUpdate.css';
import Image from 'next/image';
import dropUp from '@/assets/icons/dropup.svg';
import dropDown from '@/assets/icons/dropdown.svg';
import { useState } from 'react';

export default function MyInfoUpdateSetting(){
  const [drop, setDrop] = useState(true);
  return (<section className={styles.settingSection}>
    <button onClick={()=>setDrop(prevState => !prevState)} className={styles.settingDropDownButton}>
      <div />
      <div>고급 설정</div>
      <div>
        <p className="invisible">a</p>
        {!drop && <Image src={dropUp} width={15} height={15} alt="" />}
        {drop && <Image src={dropDown} width={15} height={15} alt="" />}
      </div>
    </button>
    {drop &&<div className="">
    <button className="btn">간편 결제 비밀번호 변경</button>
    <button className="btn">로그아웃</button>
    <button className="btn">회원 탈퇴</button></div>}
  </section>)
}