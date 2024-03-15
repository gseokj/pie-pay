import {useRouter} from "next/navigation";
import KakaoSocialButton from "@/app/(pre-verification)/component/KakaoSocialButton";
import piepaylogo from "@/assets/icons/piepaylogo.svg"
import Image from "next/image";

export default function Login() {
    // const router = useRouter();
    //
    // const onClickButton = (path:string)=>{
    //     if(path==="main") router.push("/")
    //     if(path==="auth") router.push("/auth")
    // }
  return (
      <div >
          <Image src={piepaylogo} height={48} alt='piepay logo'/>
            <br/>
          <KakaoSocialButton />
      </div>
  );
}
