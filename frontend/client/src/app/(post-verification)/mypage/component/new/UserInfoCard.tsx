"use client";


import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {Me} from "@/model/member";
import {getCookie} from "@/util/getCookie";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as mainStyles from "@/styles/main/main.css";
import Image from "next/image";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import * as fontStyles from "@/styles/fonts.css";
import dayjs from "dayjs";
import settingIcon from "@/assets/icons/setting.svg";

export default function UserInfoCard() {
    const router = useRouter();
    const queryClient = useQueryClient();

    const [userInfo, setUserInfo] = useState<Me>();

    useEffect(() => {
        const token = getCookie('accessToken');
        if (token !== null) {
            const myInfo:Me|undefined  = queryClient.getQueryData(['userInfo', token]);
            if (typeof myInfo !== 'undefined') {
                setUserInfo(myInfo);
            }
        }
    }, []);

    const onClickPush = () => {
        router.push('/mypage/update');
    }

    const makePhoneNumber = (numbers: string) => {
        const cleaned = ('' + numbers).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (match) {
            return match[1] + '-' + match[2] + '-' + match[3];
        }
        return null;
    }

    return (
        <section
            className={cardStyles.cardLayout.defaultHorizontal}
            onClick={onClickPush}
        >
            <div
                className={cardStyles.cardInnerLayout.defaultHorizontal}
            >
                <div
                    className={mainStyles.imageBox.imageBox56}
                >
                    <Image
                        className={mainStyles.imageLayout}
                        src={typeof userInfo !== "undefined" && userInfo.profileImage !== null ?
                            userInfo.profileImage
                            :
                            meetDefaultImage}
                        alt="meet Image"
                        fill={true}
                        objectFit="cover"
                        sizes="(max-width: 56px)"
                    />
                </div>
                <div
                    className={cardStyles.cardInnerLayout.smallHeader}
                >
                    <h5
                        className={fontStyles.semibold}
                    >{typeof userInfo !== 'undefined' && userInfo.nickname}</h5>
                    <p>{typeof userInfo !== 'undefined' && makePhoneNumber(userInfo.phoneNumber)}</p>
                </div>
            </div>
            <button>
                <Image src={settingIcon} alt="setting button"/>
            </button>
        </section>
    );
}