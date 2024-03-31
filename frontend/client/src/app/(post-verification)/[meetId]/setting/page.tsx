"use client";


import {ReactNode, useEffect, useRef, useState} from "react";
import {Meet, MeetData, MeetInfoResponse} from "@/model/meet";
import dayjs from "dayjs";
import * as mainStyles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import * as meetStyles from "@/styles/meet/meetMain.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import backIcon from "@/assets/icons/back.svg";
import editIcon from "@/assets/icons/edit.svg";
import editWhiteIcon from "@/assets/icons/editWhite.svg";
import checkIcon from "@/assets/icons/check.svg";
import meetDefaultImage from "@/assets/images/meet_default.svg";
import dropDownIcon from "@/assets/icons/dropdown.svg";
import dropUpIcon from "@/assets/icons/dropup.svg";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useMutation, UseMutationResult, useQueryClient} from "@tanstack/react-query";
import {getCookie} from "@/util/getCookie";
import {deleteMeet, getMyMeets} from "@/api/meet";
import authAxios from "@/util/authAxios";
import {meetImage} from "@/styles/main/cardLayout.css";


type Props = {
    children: ReactNode,
    params: { meetId: string },
}


export default function MeetSetting({params}: Props) {
    const {meetId} = params;
    const token = getCookie('accessToken');
    const queryClient = useQueryClient();

    const router = useRouter();

    const [ meetInfo, setMeetInfo ] = useState<Meet>();

    const [ meetName, setMeetName ] = useState('불러오는 중..');
    const inputRef = useRef<HTMLInputElement>(null);
    const [ isChange, setIsChange ] = useState(false);
    const [ isDropDown, setIsDropDown ] = useState(false);

    const [image, setImage] = useState<string|null>(null);
    const fileInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const meetInfo: Meet|undefined = queryClient.getQueryData(['meetInfo', meetId, token]);
        if (typeof meetInfo !== 'undefined') {
            setMeetName(meetInfo?.meetName);
            setMeetInfo(meetInfo);
        }
        if (typeof meetInfo !== 'undefined' && meetInfo.meetImage !== null) {
            setImage(meetInfo.meetImage);
        }
    }, []);

    const onEdit = () => {
        setIsChange(true);
        setTimeout(() => inputRef.current?.focus(), 0);
    };

    const onCancelEdit = () => {
        setIsChange(false);
        if (typeof meetInfo !== "undefined") {
            setMeetName(meetInfo?.meetName);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setMeetName(value);
    };

    const onSubmit = async () => {
        try {
            const response = await authAxios({
                method: 'PUT',
                url: `api/meet/name`,
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                data: { "meetId": meetId ,"meetName": meetName }
            });
            setIsChange(false);
            console.log(response.data);
            queryClient.setQueryData(['meetInfo', meetId, token], (oldData: Meet) => {
                return {
                    ...oldData,
                    meetName: meetName,
                }
            });
            queryClient.setQueryData(['myMeets', token], (oldData: MeetData[]) => {
                const newData = oldData.map(data => {
                    if (data.meet.meetId === Number(meetId)) {
                        return {
                            ...data,
                            meet: {
                                ...data.meet,
                                meetName: meetName
                            }
                        };
                    }
                    return data;
                });
                return newData;
            });
        } catch (error) {
            console.error(error);
        }
    };

    const uploadImage = async (e: any) => {
        console.log(e.target.files);
        const file = e.target.files ? e.target.files[0] : null;
        if(file === null) return;

        const reader = new FileReader();

        reader.readAsDataURL(file);
        reader.onload = async (e) => {
            if (reader.readyState === 2) {
                setImage(e.target?.result as string);

                // 이미지 상태 업데이트 후 서버 요청
                const formData = new FormData();
                formData.append('image', file);
                const jsonBlob = new Blob([JSON.stringify({ "meetId": meetId })], { type: 'application/json'})
                formData.append('request', jsonBlob);

                try {
                    const response = await authAxios.put('api/meet/image', formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${token}`
                        }
                    });
                    const imageURL = response.data.result.meetImage;
                    queryClient.setQueryData(['meetInfo', meetId, token], (oldData: Meet) => {
                        return {
                            ...oldData,
                            meetImage: imageURL,
                        }
                    });
                    queryClient.setQueryData(['myMeets', token], (oldData: MeetData[]) => {
                        const newData = oldData.map(data => {
                            if (data.meet.meetId === Number(meetId)) {
                                return {
                                    ...data,
                                    meet: {
                                        ...data.meet,
                                        meetImage: imageURL
                                    }
                                };
                            }
                            return data;
                        });
                        return newData;
                    });
                    console.log(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        }

    }

    const onClickBack = () => {
        router.back();
    }

    const onClickName = () => {
        setIsChange(!isChange);
    }

    const onClickAccordion = () => {
        setIsDropDown(!isDropDown);
    }

    const onClickDelete = async () => {
        if (typeof token === 'string') {
            await deleteMeet(meetId, token);
            queryClient.setQueryData(['myMeets', token], (oldData: MeetData[]) => {
                const newData = oldData.filter(meet => meet.meet.meetId !== Number(meetId));
                return newData
            })
            router.replace('/');
        } else {
            console.error('can not find token');
        }
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
                    <div className={mainStyles.imageBox.imageBox96}>
                        <Image
                            className={mainStyles.imageLayout}
                            src={typeof meetInfo !== 'undefined' && image !== null ?
                                image
                                :
                                meetDefaultImage
                            }
                            alt="meet image"
                            fill={true}
                            objectFit="cover"
                            sizes="(max-width: 96px)"
                        />
                    </div>
                    <button
                        className={mainStyles.buttonContainerRound}
                        onClick={() => fileInput.current?.click()}
                    >
                        <Image src={editWhiteIcon} alt="edit white icon" width={24} height={24}/>
                    </button>
                    <input type="file" name="imageURL" id="inputFile" accept="image/*"
                    ref={fileInput} onChange={uploadImage} className={mainStyles.visibility.none}/>
                </div>
            </article>
            <article>
                <div className={mainStyles.line}></div>
                <div className={meetStyles.setTableContainer}>
                    <div className={meetStyles.setTableInner}>
                        <h5>모임 이름</h5>
                        {isChange ?
                            <input
                                ref={inputRef}
                                type="text"
                                className={meetStyles.setInput}
                                value={meetName}
                                onChange={(e) => onChange(e)}
                                onBlur={onCancelEdit}
                                onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                            />
                            :
                            <p className={fontStyles.semibold}>{meetName}</p>
                        }
                    </div>
                    {isChange ?
                        <button onClick={onSubmit}>
                            <Image src={checkIcon} alt="check icon" width={24} height={24}/>
                        </button>
                        :
                        <button onClick={onEdit}>
                            <Image src={editIcon} alt="edite icon" width={24} height={24}/>
                        </button>
                    }
                </div>
                <div className={mainStyles.line}></div>
                <div className={meetStyles.setTableInner}>
                    <h5>시작일</h5>
                    <p>{typeof meetInfo !== 'undefined' && dayjs(meetInfo.createdAt).format("YYYY년 M월 DD일")}</p>
                </div>
                <div className={mainStyles.line}></div>
                <div className={meetStyles.setTableInner}>
                    <h5>멤버 수</h5>
                    <p>{typeof meetInfo !== 'undefined' && meetInfo.memberCount}명</p>
                </div>
                <div className={mainStyles.line}></div>
            </article>
            <article
                className={meetStyles.setTableAccordion}
                onClick={onClickAccordion}
            >
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
                    className={`
                        ${buttonStyles.mainButton.settingButton}
                        ${isDropDown ? mainStyles.visibility.visible : mainStyles.visibility.none}
                        ${isDropDown ? meetStyles.opacity.full : meetStyles.opacity.none}
                    `}
                    onClick={onClickDelete}
                >모임 나가기</button>
            </div>
            <div className={mainStyles.line}></div>
        </section>
    );
}