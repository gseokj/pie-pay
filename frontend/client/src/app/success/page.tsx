"use client";


import {useRouter, useSearchParams} from "next/navigation";


export default function Success() {
    const router = useRouter();
    const params = useSearchParams();
    const accessToken = params.get('accessToken');
    const refreshToken = params.get('refresh-token');

    if (typeof accessToken === 'string') {
        sessionStorage.setItem('accessToken', accessToken);
    }
    if (typeof refreshToken === 'string') {
        sessionStorage.setItem('refreshToken', refreshToken);
    }
    console.log('로그인 성공');

    router.push('/');

    return (
        <div>
            <h1>로그인 성공!</h1>
        </div>
    );
};
