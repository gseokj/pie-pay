"use client";

import {useEffect} from "react";

const URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/oauth2/authorize/kakao`
const redirectURL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/auth`

export default function KakaoSocialButton() {
  const getURL = async () => {
    console.log('getURL...')
    const response = await fetch(URL);
    const json = await response.json();
    console.log(json);
    return json
  }
  useEffect(() => {
    getURL();
  },[]);
  return (
    <button type="button">카카오 로그인</button>
  );
}