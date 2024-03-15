import Link from "next/link";

const redirectURL = `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/auth`
const URL = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/oauth2/authorization/kakao?redirect_uri=${redirectURL}`

export default function KakaoSocialButton() {
  return (
    <Link href={URL}>카카오 로그인</Link>
  );
}