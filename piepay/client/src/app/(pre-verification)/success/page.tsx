'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as fontStyles from "@/styles/fonts.css";

export default function Success({
                                  searchParams,
                                }: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
    const router = useRouter();
    const accessToken = searchParams.accessToken;

    const setToken = async () => {
    if (typeof accessToken === 'string') {
        document.cookie = `accessToken=${accessToken}`;

        // refreshRequest(accessToken);

    } else {
        router.back();
    }};

    useEffect(() => {
        setToken();
        const timer = setTimeout(() => {
            router.push('/');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section>
            <div className={fontStyles.bold}>로그인 완료!</div>
        </section>
    );
}
