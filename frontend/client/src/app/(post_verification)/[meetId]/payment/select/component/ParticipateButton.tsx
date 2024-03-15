'use client'

import {useRouter} from "next/navigation";
import * as styles from "@/styles/payment/select/selectMember.css";
import {useMemberFilter} from "@/store/stores/useMemberFilter";

type Props={
    meetId: string
}

export default function ParticipateButton({ meetId }: Props) {
    const route = useRouter();
    const {filterMembers} = useMemberFilter();
    const onClickReplace = () => {
        // 1. backend로 보내고 2. zustand로 a받기

        route.replace(`/${meetId}/payment/approve`);
    }
    return(
    <button onClick={onClickReplace} className={styles.submitButton}>
        <div>알림 보내기</div>
    </button>
    )
}