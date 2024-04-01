"use client";


import {useState} from "react";
import {faker} from "@faker-js/faker";
import BankAccount from "./component/BankAccount";
import MeetGroup from "@/app/(post-verification)/component/meets/MeetGroup";
import MeetCreateButton from "@/app/(post-verification)/component/meets/MeetCreateButton";
import MeetJoinButton from "@/app/(post-verification)/component/meets/MeetJoinButton";
import MeetJoinCard from "@/app/(post-verification)/component/meets/MeetJoinCard";
import MeetJoinModal from "@/app/(post-verification)/component/meets/MeetJoinModal";
import MeetCreateModal from "@/app/(post-verification)/component/meets/MeetCreateModal";
import * as styles from "@/styles/main/main.css";
import * as fontStyles from "@/styles/fonts.css";
import {getMeetInfo, getMyMeets} from "@/api/meet";
import {QueryClient, useQuery, useQueryClient} from "@tanstack/react-query";
import {GetMyMeetsResponse, Meet, MeetData} from "@/model/meet";
import {getCookie} from "@/util/getCookie";
import {getAccount} from "@/api/account";


export default function Main() {
    const token = getCookie('accessToken');
    // const queryClient = useQueryClient();
    // const meetData: GetMyMeetsResponse|undefined = queryClient.getQueryData(['myMeets', token]);

    const { data: meetData, isLoading, error } = useQuery({queryKey: ['myMeets', token], queryFn: getMyMeets}) ;
    if (error) console.log(error.message);
    const myMeets = meetData?.result;

    const [joinModalVisibility, setJoinModalVisibility] = useState(false);
    const [createModalVisibility, setCreateModalVisibility] = useState(false);

    const joinModalOn = () => {
        console.log('clicked')
        setJoinModalVisibility(true);
    }

    const createModalOn = () => {
      console.log('create clicked')
      setCreateModalVisibility(true);
    }

    if (isLoading) {
        return (<></>);
    } else {
        return (
            <>
                <BankAccount />
                <div className={styles.categoryContainer.default}>
                    <div className={styles.category}>
                        <h3 className={fontStyles.bold}>모임</h3>
                        <p>{myMeets?.length}</p>
                    </div>
                    {typeof myMeets !== 'undefined' && myMeets.length !== 0 &&
                        <button
                            className={`${fontStyles.bold}`}
                            onClick={joinModalOn}
                        >모임 입장</button>
                    }
                </div>
                {typeof myMeets !== 'undefined' && myMeets.map((meet: MeetData) => {
                    return (
                        <MeetGroup meetData={meet} key={meet.meet.meetId} />
                    )
                })}
                {typeof myMeets !== 'undefined' && myMeets.length === 0 ? <MeetJoinCard /> : <MeetJoinButton onClick={joinModalOn} />}
                <MeetCreateButton onClick={createModalOn} />
                <MeetJoinModal isJoinModalOn={joinModalVisibility} clickJoinModal={() => { setJoinModalVisibility(false)}} clickExitModal={()=>{setJoinModalVisibility(false)}}/>
                <MeetCreateModal isCreateMeetModalOn={createModalVisibility} clickCreate={()=>{setCreateModalVisibility(false)}} clickExitCreate={()=>{setCreateModalVisibility(false)}} />
            </>
        );
    }
}
