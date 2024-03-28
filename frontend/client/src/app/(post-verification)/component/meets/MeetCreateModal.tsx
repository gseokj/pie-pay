"use client";

import * as modalStyles from "@/styles/main/mainModal.css";
import * as cardStyles from "@/styles/main/cardLayout.css";
import * as buttonStyles from "@/styles/main/mainButton.css";
import * as fontCss from "@/styles/fonts.css";
import RandomName from "@/app/(post-verification)/component/utils/RandomName";
import {useEffect, useState} from "react";
import {CreateMeetRequest, CreateMeetResponse} from "@/model/meet";
import { postCreateMeet } from "@/api/meet";
import {useRouter} from "next/navigation";

interface CreateMeetModalProps{
    isCreateMeetModalOn: boolean;
    clickCreate: ()=>void;
    clickExitCreate: ()=>void;
}

export default function MeetCreateModal({ isCreateMeetModalOn, clickCreate, clickExitCreate }: CreateMeetModalProps) {
    const [modalOn, setModalOn] = useState(false);
    const [randomName, setRandomName] = useState('모임');
    const [meetName, setMeetName] = useState('');
    const [isTyped, setIsTyped] = useState(false);

    const [startY, setStartY] = useState(0);
    const [currentY, setCurrentY] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [modalY, setModalY] = useState(-56);

    const router = useRouter();

    async function createMeetRequest(meetName: string) {

        try {
            const response = await postCreateMeet({ meetName:meetName });
            console.log("Success Create", response);
            router.push(`/${response.result.meetId}`);
        } catch (error) {
            console.error("Fail Create", error);
        }

        // const response = await (await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/meet`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },
        //     body: JSON.stringify({ meetName: meetName })
        // })).json();
        //
        // console.log(response);
    }

    useEffect(()=>{
        if (isCreateMeetModalOn) {
            setModalY(0);
            const createdRandom = RandomName();
            setRandomName(createdRandom+'모임');
        }
        setModalOn(isCreateMeetModalOn);
    }, [isCreateMeetModalOn]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMeet();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length > 1) setIsTyped(true);
        if (value.length == 0) setIsTyped(false);
        if (value.length <= 12) setMeetName(value);
    }

    const closeModal = () => {
        setModalY(-56);
        setModalOn(false);
        clickExitCreate();
    }

    const createMeet = () => {
        if (meetName === '') {
            console.log(randomName);
            createMeetRequest(randomName);
        } else {
            console.log(meetName);
            createMeetRequest(meetName);
        }
        setMeetName('');
        setModalOn(false);
        clickCreate();
    }

    const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
        console.log('start mouse', dragging);
        setDragging(true);
        setStartY(e.clientY);
        setCurrentY(e.clientY);
    }

    const handleDragStartTouch = (e: React.TouchEvent<HTMLDivElement>) => {
        setDragging(true);
        const touch = e.touches[0];
        setStartY(touch.clientY);
        setCurrentY(touch.clientY);
    }

    const handleDragging = (e: React.MouseEvent) => {
        if (dragging) {
            setCurrentY(e.clientY);
            const diff = (startY - currentY)/window.innerHeight*100;
            setModalY(diff);
        }
    }

    const handleDraggingTouch = (e: React.TouchEvent) => {
        if (dragging) {
            const touch = e.touches[0];
            setCurrentY(touch.clientY);
            if (startY - currentY < 0) {
                const diff = (startY - currentY)/window.innerHeight*100;
                setModalY(diff);
            }
        }
    }

    const handleDragEnd = () => {
        setDragging(false);
        const diff = (startY - currentY)/window.innerHeight*100;
        if (diff < -20) {
            closeModal();
        } else {
            setModalY(0);
        }
        setStartY(0);
        setCurrentY(0);
    }

    return (
        <>
            <div
                className={`${modalStyles.modalLayout.createMeetModal} ${modalOn && modalStyles.modalOn}`}
                onMouseMove={handleDragging}
                onMouseUp={handleDragEnd}
                onTouchEnd={handleDragEnd}
                onTouchMove={handleDraggingTouch}
                style={modalY>=-60 ? {bottom: `${modalY}%`} : {bottom: 0}}
            >
                <div
                    className={modalStyles.modalHandleArea}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStartTouch}
                >
                    <div className={`${modalStyles.modalHandle} ${dragging && modalStyles.modalHandleActive}`}></div>
                </div>
                <div className={modalStyles.modalContentLayout}>
                    <h3 className={`${fontCss.bold}`}>모임 이름</h3>
                    <form
                        className={`${cardStyles.lineLayoutJoin.lineTwo} ${cardStyles.codeContainer}`}
                        onSubmit={(e) => onSubmit(e)}
                    >
                        <input
                            name="meetNameInput"
                            value={meetName}
                            onChange={(e) => onChange(e)}
                            className={cardStyles.modalInput}
                            placeholder={randomName}
                        />
                        <div className={`${cardStyles.codeUnderline} ${isTyped && cardStyles.right}`}></div>
                    </form>
                    <div className={cardStyles.lineLayoutJoin.lineThreeModal}>
                        <button
                            className={`${cardStyles.modalExitButton} ${fontCss.semibold}`}
                            onClick={closeModal}
                        >취소하기</button>
                        <button
                            className={`${buttonStyles.mainButton.modalButton} ${fontCss.semibold}`}
                            onClick={createMeet}
                        >모임 생성하기</button>

                    </div>
                </div>
            </div>
            <section
                className={`${modalStyles.modalBackground} ${modalOn && modalStyles.modalBackgroundOn}`}
                onClick={closeModal}
            ></section>
        </>
    );
}