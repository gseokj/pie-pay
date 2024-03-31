"use client";


import {useEffect, useState} from "react";
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
    const queryClient = useQueryClient();
    const myMeets: MeetData[]|undefined = queryClient.getQueryData(['myMeets', token]);

    const [meets, setMeets] = useState<MeetData[]>([]);

    // const { data: myMeets, isLoading, error } = useQuery({queryKey: ['myMeets', token], queryFn: getMyMeets}) ;
    // if (error) console.log(error.message);

    const [joinModalVisibility, setJoinModalVisibility] = useState(false);
    const [createModalVisibility, setCreateModalVisibility] = useState(false);

    useEffect(() => {
        if (typeof myMeets !== 'undefined') {
            setMeets(sortMeetData(myMeets));
        }
    }, [myMeets]);

    const joinModalOn = () => {
        console.log('clicked')
        setJoinModalVisibility(true);
    }

    const createModalOn = () => {
      console.log('create clicked')
      setCreateModalVisibility(true);
    }

    function sortMeetData(meetDataArray: MeetData[]): MeetData[] {
        return meetDataArray.sort((a, b) => {
            if (a.topFixed && !b.topFixed) return -1;
            if (!a.topFixed && b.topFixed) return 1;

            if (a.topFixed === b.topFixed) {
                if (a.updated_at && b.updated_at) {
                    return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
                }
                if (a.updated_at === null && b.updated_at !== null) return 1;
                if (a.updated_at !== null && b.updated_at === null) return -1;

                return new Date(b.meet.createdAt).getTime() - new Date(a.meet.createdAt).getTime();
            }
            return 0;
        });
    }

    if (typeof meets === 'undefined') {
        return (<></>);
    } else {
        return (
            <>
                <BankAccount />
                <div className={styles.categoryContainer.default}>
                    <div className={styles.category}>
                        <h3 className={fontStyles.bold}>모임</h3>
                        <p>{meets?.length}</p>
                    </div>
                    {typeof meets !== 'undefined' && meets.length !== 0 &&
                        <button
                            className={`${fontStyles.bold}`}
                            onClick={joinModalOn}
                        >모임 입장</button>
                    }
                </div>
                {typeof meets !== 'undefined' && meets.map((meet: MeetData) => {
                    return (
                        <MeetGroup meetData={meet} key={meet.meet.meetId} />
                    )
                })}
                {typeof meets !== 'undefined' && meets.length === 0 ? <MeetJoinCard /> : <MeetJoinButton onClick={joinModalOn} />}
                <MeetCreateButton onClick={createModalOn} />
                <MeetJoinModal isJoinModalOn={joinModalVisibility} clickJoinModal={() => { setJoinModalVisibility(false)}} clickExitModal={()=>{setJoinModalVisibility(false)}}/>
                <MeetCreateModal isCreateMeetModalOn={createModalVisibility} clickCreate={()=>{setCreateModalVisibility(false)}} clickExitCreate={()=>{setCreateModalVisibility(false)}} />
            </>
        );
    }
}
