"use client";


import {useRouter} from "next/navigation";
import {getMyInfo} from "@/api/user";


export default function Success({
    searchParams
}: {
    searchParams : { [key: string]: string | string[] | undefined }
}) {
    const router = useRouter();

    const accessToken = searchParams.accessToken;
    const refreshToken = searchParams.refreshToken;

    if (accessToken && refreshToken) {
        fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/success/api?accessToken=${accessToken}&refreshToken=${refreshToken}`, {
            method: 'POST'
        })
            .then(response => {
                console.log(response);
                console.log('token saved');
                setSession();
            })
            .catch(error => console.error(error));
    }
    const setSession = async () => {
        const myInfo = await getMyInfo();
        console.log(myInfo);
        // sessionStorage.setItem()
        router.push('/');

    }

    return (
        <div>
            로그인 완료!
        </div>
    )
}