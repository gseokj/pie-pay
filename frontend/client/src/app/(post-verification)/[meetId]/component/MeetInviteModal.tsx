"use client";

import {useStore} from "@/store/useMeetModalStore";
import {useEffect} from "react";
import * as buttonStyles from "@/styles/main/mainButton.css";
import * as cardStyles from "@/styles/main/mainCard.css";
import * as fontStyles from "@/styles/fonts.css";
import * as modalStyles from "@/styles/main/mainModal.css";
import * as styles from "@/styles/main/mainModal.css";
import * as fontCss from "@/styles/fonts.css";

interface InviteMemberProps {
    meetInvitation: string;
}

export default function MeetInviteModal({ meetInvitation }: InviteMemberProps) {
    const {isInviteModalOn, changeInviteModalStatus, setInviteModalStatus} = useStore((state) => state);

    const onClickCreateLink = () => {
        console.log('링크 생성');
        changeInviteModalStatus();
    }

    return (
        <>
            <section
                className={`${styles.modalLayout.joinMeetModal} ${isInviteModalOn && styles.modalOn}`}
            >
                <div className={styles.modalHandleArea}>
                    <div className={`${styles.modalHandle}`}></div>
                </div>
                <div className={styles.inviteModalContentLayout}>
                    <div
                        className={cardStyles.cardInnerLayout.defaultHeader}
                    >
                        <h3
                            className={fontStyles.semibold}
                        >멤버 초대</h3>
                        <p>
                            모임 멤버가 혼자에요<br/>
                            멤버를 초대해보세요
                        </p>
                    </div>
                    <div
                        className={cardStyles.cardInnerLayout.inviteInner}
                    >
                        <p>초대코드</p>
                        <h1
                            className={fontStyles.bold}
                        >{meetInvitation.toUpperCase()}</h1>
                    </div>
                    <div className={modalStyles.inviteModalButtons}>
                        <button
                            className={`${modalStyles.modalExitButton} ${fontCss.semibold}`}
                            onClick={changeInviteModalStatus}
                        >취소하기
                        </button>
                        <button
                            className={`${buttonStyles.mainButton.modalButton} ${fontStyles.bold}`}
                            onClick={onClickCreateLink}
                        >링크 생성하기
                        </button>
                    </div>
                </div>
            </section>
            <section
                className={`${styles.modalBackground} ${isInviteModalOn && styles.modalBackgroundOn}`}
                onClick={changeInviteModalStatus}
            >
            </section>
        </>
    );
}