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
import {QueryClient, useQueryClient} from "@tanstack/react-query";
import {GetMyMeetsResponse, Meet, MeetData} from "@/model/meet";
import {getCookie} from "@/util/getCookie";


// const dummys = [
//   {
//     meetId: 1,
//     meetName: 'SSAFY 공통 A402',
//     meetDate: '2시간전',
//     meetImage: faker.image.avatar(),
//     meetMembers: [
//       {
//         "memberId": 1,
//         "nickname": "m1",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 2,
//         "nickname": "m2",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 3,
//         "nickname": "m3",
//         "profileImage": faker.image.avatar()
//       },
//     ],
//     favorite: true
//   },
//   {
//     meetId: 2,
//     meetName: '햇님중학교 동창회',
//     meetDate: '어제',
//     meetImage: faker.image.avatar(),
//     meetMembers: [
//       {
//         "memberId": 4,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 5,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 6,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 7,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 8,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 9,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//     ],
//     favorite: true
//   },
//   {
//     meetId: 3,
//     meetName: '고향친구들',
//     meetDate: '어제',
//     meetImage: faker.image.avatar(),
//     meetMembers: [
//       {
//         "memberId": 10,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 11,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 12,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 13,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//     ],
//     favorite: false
//   },
//   {
//     meetId: 4,
//     meetName: '갈까마귀모임',
//     meetDate: '어제',
//     meetImage: faker.image.avatar(),
//     meetMembers: [
//       {
//         "memberId": 10,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 11,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 12,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 13,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 14,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 15,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 16,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 17,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//     ],
//     favorite: false
//   },
//   {
//     meetId: 5,
//     meetName: '갈까마귀모임',
//     meetDate: '어제',
//     meetImage: faker.image.avatar(),
//     meetMembers: [
//       {
//         "memberId": 10,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 11,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 12,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 13,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 14,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 15,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 16,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 17,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//     ],
//     favorite: false
//   },
//   {
//     meetId: 6,
//     meetName: '갈까마귀모임',
//     meetDate: '어제',
//     meetImage: faker.image.avatar(),
//     meetMembers: [
//       {
//         "memberId": 10,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 11,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 12,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 13,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 14,
//         "nickname": "m4",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 15,
//         "nickname": "m5",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 16,
//         "nickname": "m6",
//         "profileImage": faker.image.avatar()
//       },
//       {
//         "memberId": 17,
//         "nickname": "m7",
//         "profileImage": faker.image.avatar()
//       },
//     ],
//     favorite: false
//   },
// ]

const dummys:Dummy[] = []

export interface Dummy {
  meetId: number;
  meetName: string;
  meetDate: string;
  meetImage: string;
  meetMembers: {
    memberId: number;
    nickname: string;
    profileImage: string;
  }[];
  favorite: boolean;
}


export default function Main() {
    const accessToken = getCookie('accessToken');
    const queryClient = useQueryClient();
    const meetData: GetMyMeetsResponse|undefined = queryClient.getQueryData(['myMeets', accessToken]);
    console.log(meetData, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    const myMeets = meetData?.result;
    console.log('myMeets', myMeets);

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
    
    return (
        <>
            <BankAccount />
            <div className={styles.categoryContainer.default}>
                <div className={styles.category}>
                    <h3 className={fontStyles.bold}>모임</h3>
                    <p>{dummys.length}</p>
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
