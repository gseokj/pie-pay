import * as styles from '@/styles/mypage/myInfoUpdate.css';
import Image from 'next/image';
import pen from '@/assets/icons/pen.svg';
import { Me } from '@/model/member';
import { getMyInfo } from '@/util/getMyInfo';
import { useQueryClient } from '@tanstack/react-query';
import { getCookie } from '@/util/getCookie';
import { ChangeEvent, useEffect, useState } from 'react';
import { RequestMemberModify, ResponseMemberModify } from '@/model/myPage';
import { putMemberModify } from '@/api/memberModify';
import { send } from 'process';
export default function MyInfoUpdateTextField() {
  const queryClient = useQueryClient();
  const myInfo: Me | undefined = queryClient.getQueryData([
    'me',
    getCookie('accessToken'),
  ]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [nickName, setNickName] = useState<string | undefined>('');
  const [token, setToken] = useState('');
  useEffect(() => {
    setNickName(myInfo?.nickname);
  });

  const sendVerificationRequest = async () => {
    try {
      const request: RequestMemberModify = {
        nickname: nickName,
      };
      const response = await putMemberModify(request, token);
      console.log('Verification response:', response);
    } catch (error) {}
  };

  const handleSubmit = () => {
    sendVerificationRequest();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newNickName = e.target.value;
  };

  return (
    <section className={styles.textLineSection}>
      <hr />
      <div className={styles.content.nickname}>
        <p>닉네임</p>
        <div className={styles.box.nickname}>
          <input value={nickName} onChange={handleChange}></input>
          {/* <p>{myInfo?.nickname}</p> */}
          <Image src={pen} alt={''} onClick={handleSubmit} />
        </div>
      </div>
      <hr />
      <hr />
      <div className={styles.content.email}>
        <p>이메일</p>
        <div className={styles.box.email}>
          <p className={styles.p.email}>{myInfo?.email}</p>
        </div>
      </div>
      <hr />
      <hr />
      <div className={styles.content.phoneNumber}>
        <p>전화번호</p>
        <div className={styles.box.phoneNumber}>
          <p className={styles.p.phoneNumber}>{myInfo?.phoneNumber}</p>
        </div>
      </div>
      <hr />
      <hr />
    </section>
  );
}
