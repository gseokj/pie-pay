"use client";

import {useStore} from "@/store/useInviteModalStore";

export default function MeetInviteModal() {
    const {isModalOn, changeModalStatus} = useStore((state) => state)

    return (
        <>
            {isModalOn && "hi"}
        </>
    );
}