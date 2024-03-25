import {faker} from "@faker-js/faker";
import Image from "next/image";
import dayjs from "dayjs";
import settingIcon from "@/assets/icons/setting.svg";
import * as mainStyles from "@/styles/main/main.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";


type Props = {
    params: { meetId: string },
}


export default function MeetInfoCard({params}: Props) {
    const {meetId} = params;
    const meetInfo = {
        meetName: "meetName",
        meetImage: null,
        createdAt: "2024-03-19T15:43:57.3042142"
    }
    const defaultImage = faker.image.avatarGitHub();
    const createdDate = dayjs(meetInfo.createdAt);

    return (
        <section
            className={ cardStyles.cardLayout.defaultHorizontal }
        >
            <div
                className={ cardStyles.cardInnerLayout.defaultHorizontal }
            >
                <div
                    className={ mainStyles.imageLayout }
                >
                    <img
                        className={ mainStyles.imageLayout }
                        src={ meetInfo.meetImage == null ? defaultImage : meetInfo.meetImage }
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