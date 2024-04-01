import {faker} from "@faker-js/faker";
import Image from "next/image";
import dayjs from "dayjs";
import settingIcon from "@/assets/icons/setting.svg";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import {useRouter} from "next/navigation";


type Props = {
    params: { meetId: string },
}


export default function MeetInfoCard({params}: Props) {
    const {meetId} = params;
    const router = useRouter();

    const meetInfo = {
        meetName: "meetName",
        meetImage: null,
        createdAt: "2024-03-19T15:43:57.3042142"
    }
    const createdDate = dayjs(meetInfo.createdAt);

    const onClickPush = () => {
        router.push(`/${meetId}/setting`)
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
                    className={ mainStyles.imageLayout }
                >
                    <Image
                        className={ mainStyles.imageLayout }
                        src={ meetInfo.meetImage === null ? meetDefaultImage : meetInfo.meetImage }
                        alt="meet Image"
                        width={56}
                        height={56}
                    />
                </div>
                <div
                    className={ cardStyles.cardInnerLayout.smallHeader }
                >
                    <h5
                        className={ fontStyles.semibold }
                    >{ meetInfo.meetName }</h5>
                    <p>since { createdDate.format("YYYY.MM.DD") }</p>
                </div>
            </div>
            <button>
                <Image src={ settingIcon } alt="setting button" />
            </button>
        </section>
    );
}