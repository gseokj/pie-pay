import * as styles from '@/styles/mypage/myInfoUpdate.css';
import Image from 'next/image';
import pen from '@/assets/icons/pen.svg';
import { Me } from '@/model/member';

export default function MyInfoUpdateTextField(){

  const myInfo:Me = JSON.parse(sessionStorage.getItem("myInfo")!);
  return (
    <section className={styles.textLineSection}>
      <hr />
      <div className={styles.content.nickname}>
        <p>닉네임</p>
        <div className={styles.box.nickname}>
          <p>{myInfo.nickname}</p>
          <Image src={pen} alt={''} />
        </div>
      </div>
      <hr />
      <hr />
      <div className={styles.content.email}>
        <p>이메일</p>
        <div className={styles.box.email}>
          <p className={styles.p.email}>{myInfo.email}</p>
        </div>
      </div>
      <hr />
      <hr />
      <div className={styles.content.phoneNumber}>
        <p>전화번호</p>
        <div className={styles.box.phoneNumber}>
          <p className={styles.p.phoneNumber}>{myInfo.phoneNumber}</p>
        </div>
      </div>
      <hr />
      <hr />
    </section>)
}
