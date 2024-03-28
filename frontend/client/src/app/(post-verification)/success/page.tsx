"use client";


import {useRouter} from "next/navigation";
import {getMyInfo} from "@/api/user";
import axios from "axios";


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
    } else {
        router.back();
    }
    const setSession = async () => {
        const myInfo = await getMyInfo();
        // sessionStorage.setItem('myInfo', JSON.stringify(myInfo.result));
        // JSON.parse(sessionStorage.getItem('myInfo'));
        document.cookie = `myInfo=${JSON.stringify(myInfo.result)};`;
    }

    const getRequest = async () => {
        try {
            const response = await axios(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/member/meets`, {
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                },
                withCredentials: true
            });
            console.log(response.data);
        } catch (error) {
            console.log('no..');
        }
    }

    return (
        <div>
            로그인 완료!
            <button onClick={getRequest}>get</button>
        </div>
    )
}