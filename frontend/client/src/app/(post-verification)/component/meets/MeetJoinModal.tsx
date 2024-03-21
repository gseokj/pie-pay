"use client";

import * as styles from "@/styles/main/mainModal.css";
import MeetJoin from "./MeetJoin";
import {useEffect, useState} from "react";

interface MeetJoinModalProps{
    isJoinModalOn: boolean;
    clickJoinModal: ()=>void;
    clickExitModal: ()=>void;
}

export default function MeetJoinModal({ isJoinModalOn, clickJoinModal, clickExitModal }: MeetJoinModalProps) {
    const [modalOn, setModalOn] = useState(false);
    useEffect(() => {
        setModalOn(isJoinModalOn);
    }, [isJoinModalOn]);

    const handleClickExit = () => {
        console.log('모달 닫기');
        setModalOn(false);
        clickExitModal();
    }

    const handleClickJoin = () => {
        console.log('값 제출 후 닫기');
        setModalOn(false);
        clickJoinModal();
    }

    return (
        <>
            <div className={`${styles.modalLayout} ${modalOn && styles.modalOn}`}>
                <div className={styles.modalHandle}></div>
                <div className={styles.modalContentLayout}>
                    <MeetJoin
                        isModal={true}
                        clickJoin={handleClickJoin}
                        clickExit={handleClickExit}
                    />
                </div>
            </div>
            <section
                className={`${styles.modalBackground} ${modalOn && styles.modalBackgroundOn}`}
                onClick={handleClickExit}
            >
            </section>
        </>
    );
}