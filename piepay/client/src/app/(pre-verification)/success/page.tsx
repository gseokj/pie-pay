'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as fontStyles from "@/styles/fonts.css";
import Image from "next/image";
import piepayLoadGif from "@/assets/gif/piepay.gif";

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
        // router.push('/');
        const timer = setTimeout(() => {
            router.push('/');
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Image src={piepayLoadGif} alt="loading gif" height={200} width={200} unoptimized={true} />
            <div className={fontStyles.bold} style={{ fontSize: "1.4rem" }}>로그인 완료!</div>
          </div>
        </section>
    );
}
