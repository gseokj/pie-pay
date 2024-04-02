'use client';

import { useRouter } from 'next/navigation';
import { getMyInfo } from '@/api/user';
import authAxios from '@/util/authAxios';
import { refreshRequest } from '@/api/meet';
import { useEffect } from 'react';

export default function Success({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const router = useRouter();
  const accessToken = searchParams.accessToken;

  const setToken = async () => {
    if (typeof accessToken === 'string') {
      document.cookie = `accessToken=${accessToken}`;
      setSession(accessToken);
      // refreshRequest(accessToken);
      router.push('/');
    } else {
      router.back();
    }
  };

  const setSession = async (token: string) => {
    const myInfo = await getMyInfo(token);
    document.cookie = `myInfo=${JSON.stringify(myInfo.result)};`;
  };

  useEffect(() => {
    setToken();
  }, []);

  return <div>로그인 완료!</div>;
}
