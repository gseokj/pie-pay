import {faker} from "@faker-js/faker";
import Image from "next/image";
import settingIcon from "@/assets/icons/setting.svg";
import * as cardStyles from "@/styles/main/mainCard.css";
import dayjs from "dayjs";


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
                <div>
                    <img
                        src={ meetInfo.meetImage == null ? defaultImage : meetInfo.meetImage }
                        width={56}
                        height={56}
                    />
                </div>
                <div>
                    <h3>{ meetInfo.meetName }</h3>
                    <p>since { createdDate.format("YYYY.MM.DD") }</p>
                </div>
            </div>
            <button>
                <Image src={ settingIcon } alt="setting button" />
            </button>
        </section>
    );
}