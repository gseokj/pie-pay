"use client";


import {ReactNode, useEffect, useState} from "react";
import {Meet} from "@/model/meet";
import dayjs from "dayjs";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as meetStyles from "@/styles/meet/meetMain.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import backIcon from "@/assets/icons/back.svg";
import editIcon from "@/assets/icons/edit.svg";
import editWhiteIcon from "@/assets/icons/editWhite.svg";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import dropDownIcon from "@/assets/icons/dropdown.svg";
import dropUpIcon from "@/assets/icons/dropup.svg";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {setTableAccordion} from "@/styles/meet/meetMain.css";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}

const dummy: Meet = {
    createdAt: '2012-11-26T13:51:50.417-07:00',
    updatedAt: '2012-01-26T13:51:50.417-07:00',
    meetId: 2,
    meetName: '갈까마귀모임',
    meetImage: null,
    meetInvitation: '7AB83Y',
    membersCount: 1,
}

export default function MeetSetting({params}: Props) {
    const {meetId} = params;
    const router = useRouter();
    const [ meetName, setMeetName ] = useState('불러오는 중..');
    const [ isChange, setIsChange ] = useState(false);
    const [ isDropDown, setIsDropDown ] = useState(false);

    useEffect(() => {
        setMeetName(dummy.meetName);
    }, []);

    const onClickBack = () => {
        router.back();
    }

    const onClickName = () => {
        setIsChange(!isChange);
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value; // 첫 번째 글자만 취함
        setMeetName(value);
    }

    const onClickAccordion = () => {
        setIsDropDown(!isDropDown);
    }

    return (
        <section>
            <header className={mainStyles.detailHeader}>
                <button onClick={onClickBack}>
                    <Image src={backIcon} alt="back icon" width={36} height={36}/>
                </button>
                <h1 className={fontStyles.bold}>모임 관리</h1>
            </header>
            <article className={meetStyles.setCenterContainer}>
                <div className={meetStyles.setImageContainer}>
                    <Image
                        className={mainStyles.imageLayout}
                        src={meetDefaultImage} alt="meet default image" width={96} height={96}/>
                    <button className={mainStyles.buttonContainerRound}>
                        <Image src={editWhiteIcon} alt="edit white icon" width={24} height={24}/>
                    </button>
                </div>
            </article>
            <article>
                <div className={mainStyles.line}></div>
                <div className={meetStyles.setTableContainer}>
                    <div className={meetStyles.setTableInner}>
                        <h5>모임 이름</h5>
                        {isChange ?
                            <input
                                value={meetName}
                                onChange={(e) => onChange(e)}
                            />
                            :
                            <p className={fontStyles.semibold}>{meetName}</p>
                        }
                    </div>
                    <button onClick={onClickName}>
                        <Image src={editIcon} alt="edit white icon" width={24} height={24}/>
                    </button>
                </div>
                <div className={mainStyles.line}></div>
                <div className={meetStyles.setTableInner}>
                    <h5>시작일</h5>
                    <p>{dayjs(dummy.createdAt).format("YYYY년 M월 DD일")}</p>
                </div>
                <div className={mainStyles.line}></div>
                <div className={meetStyles.setTableInner}>
                    <h5>멤버 수</h5>
                    <p>{dummy.membersCount}명</p>
                </div>
                <div className={mainStyles.line}></div>
            </article>
            <article className={meetStyles.setTableAccordion}>
                <h3>고급 설정</h3>
                <button className="dropDownButton" onClick={onClickAccordion}>
                    {isDropDown ?
                        <Image src={dropUpIcon} alt="drop up icon" width={40} height={40}/>
                        :
                        <Image src={dropDownIcon} alt="drop down icon" width={40} height={40}/>
                    }
                </button>
            </article>
            <div className={meetStyles.setAccordionButtonContainer}>
                <button
                    className={`${buttonStyles.mainButton.settingButton}
                    ${isDropDown ? mainStyles.visibility.visible : mainStyles.visibility.none}
                    ${isDropDown ? meetStyles.opacity.full : meetStyles.opacity.none}
                    `}
                >모임 나가기</button>
            </div>
            <div className={mainStyles.line}></div>
        </section>
    );
}