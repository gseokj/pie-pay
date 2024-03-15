import {useRouter} from "next/navigation";
import KakaoSocialButton from "@/app/(pre-verification)/component/KakaoSocialButton";

export default function Login() {
    // const router = useRouter();
    //
    // const onClickButton = (path:string)=>{
    //     if(path==="main") router.push("/")
    //     if(path==="auth") router.push("/auth")
    // }
  return (
      <>
          Login Page
            <br/>
          <KakaoSocialButton />
      </>
  );
}
