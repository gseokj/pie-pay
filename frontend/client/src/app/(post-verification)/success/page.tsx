"use client";


import { useEffect } from 'react';
import {useRouter, useSearchParams} from "next/navigation";

export default function UseTokenExample() {
    const router = useRouter();
    const params = useSearchParams();

    useEffect(() => {

    }, [params]); // router.query가 변경될 때마다 useEffect 재실행

    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");
    console.log(accessToken)
    console.log(refreshToken)

    if (accessToken && refreshToken) {
        console.log('go')
        // API를 호출하여 쿠키에 토큰 저장
        fetch(`/success/api/auth/setTokens?accessToken=${accessToken}&refreshToken=${refreshToken}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Tokens are saved', data);
                router.push('/');
                // 필요한 경우, 토큰 저장 후 추가 작업 수행
            })
            .catch(error => console.error('Error saving tokens:', error));
    }

    console.log('로그인 성공');

    return (
        <div>
            <h1>Token 사용 예제</h1>
        </div>
    );
};
