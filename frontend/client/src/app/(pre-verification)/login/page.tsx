'use client'

import {useRouter} from "next/navigation";
import KakaoSocialButton from "@/app/(pre-verification)/component/KakaoSocialButton";

export default function Login() {
    const router = useRouter();

    const onClickButton = (path:string)=>{
        if(path==="main") router.push("/")
        if(path==="auth") router.push("/auth")
    }
  return (
      <>
          Login Page
            <br/>
          <button type="button" onClick={()=>onClickButton("auth")} className="border-2 p-5">인증테스트</button>
          <button type="button" onClick={()=>onClickButton("main")} className="border-2 p-5">메인테스트</button>
          <KakaoSocialButton />
      </>
  );
}
