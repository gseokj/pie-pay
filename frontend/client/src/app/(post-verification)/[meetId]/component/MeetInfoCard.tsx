"use client";


import Image from "next/image";
import dayjs from "dayjs";
import settingIcon from "@/assets/icons/setting.svg";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";
import {useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {Meet} from "@/model/meet";


type Props = {
    params: { meetId: string },
}


export default function MeetInfoCard({params}: Props) {
    const {meetId} = params;
    const router = useRouter();
    const token = getCookie('accessToken');

    const queryClient = useQueryClient();
    const meetInfo: Meet|undefined = queryClient.getQueryData(['meetInfo', meetId, token]);

    const onClickPush = () => {
        router.push(`/${meetId}/setting`);
    };

    return (
        <section
            className={ cardStyles.cardLayout.defaultHorizontal }
            onClick={onClickPush}
        >
            <div
                className={ cardStyles.cardInnerLayout.defaultHorizontal }
            >
                <div
                    className={ mainStyles.imageBox.imageBox56 }
                >
                    <Image
                        className={ mainStyles.imageLayout }
                        src={typeof meetInfo !== 'undefined' && meetInfo.meetImage !== null ?
                            meetInfo.meetImage
                            :
                            meetDefaultImage}
                        alt="meet Image"
                        fill={true}
                        sizes="(max-width: 56px)"
                    />
                </div>
                <div
                    className={ cardStyles.cardInnerLayout.smallHeader }
                >
                    <h5
                        className={ fontStyles.semibold }
                    >{typeof meetInfo !== 'undefined' && meetInfo.meetName }</h5>
                    <p>since {typeof meetInfo !== 'undefined' && dayjs(meetInfo.createdAt).format("YYYY.MM.DD") }</p>
                </div>
            </div>
            <button>
                <Image src={ settingIcon } alt="setting button" />
            </button>
        </section>
    );
}