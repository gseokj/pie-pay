"use client";


import {useRouter} from "next/navigation";


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
                router.push('/');
            })
            .catch(error => console.error(error));
    }

    return (
        <div>
            로그인 완료!
        </div>
    )
}