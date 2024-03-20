import BankAccount from "./component/BankAccount";
import MeetGroup from "@/app/(post-verification)/component/MeetGroup";
import {faker} from "@faker-js/faker";
import * as styles from "@/styles/main/main.css";
import * as fontCss from "@/styles/fonts.css";
import MeetCreateButton from "@/app/(post-verification)/component/MeetCreateButton";
import MeetJoinButton from "@/app/(post-verification)/component/MeetJoinButton";
import MeetJoin from "@/app/(post-verification)/component/MeetJoin";
import MeetJoinModal from "@/app/(post-verification)/component/MeetJoinModal";


const dummys = [
  {
    meetId: 1,
    meetName: 'SSAFY 공통 A402',
    meetDate: '2시간전',
    meetImage: faker.image.avatar(),
    meetMembers: [
      {
        "memberId": 1,
        "nickname": "m1",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 2,
        "nickname": "m2",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 3,
        "nickname": "m3",
        "profileImage": faker.image.avatar()
      },
    ],
    favorite: true
  },
  {
    meetId: 2,
    meetName: '햇님중학교 동창회',
    meetDate: '어제',
    meetImage: faker.image.avatar(),
    meetMembers: [
      {
        "memberId": 4,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 5,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 6,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 7,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 8,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 9,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
    ],
    favorite: true
  },
  {
    meetId: 3,
    meetName: '고향친구들',
    meetDate: '어제',
    meetImage: faker.image.avatar(),
    meetMembers: [
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
    ],
    favorite: false
  },
  {
    meetId: 4,
    meetName: '갈까마귀모임',
    meetDate: '어제',
    meetImage: faker.image.avatar(),
    meetMembers: [
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
    ],
    favorite: false
  },
  {
    meetId: 4,
    meetName: '갈까마귀모임',
    meetDate: '어제',
    meetImage: faker.image.avatar(),
    meetMembers: [
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
    ],
    favorite: false
  },
  {
    meetId: 4,
    meetName: '갈까마귀모임',
    meetDate: '어제',
    meetImage: faker.image.avatar(),
    meetMembers: [
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 10,
        "nickname": "m4",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 11,
        "nickname": "m5",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 12,
        "nickname": "m6",
        "profileImage": faker.image.avatar()
      },
      {
        "memberId": 13,
        "nickname": "m7",
        "profileImage": faker.image.avatar()
      },
    ],
    favorite: false
  },
]

// const dummys:Dummy[] = []

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


export default async function Main() {

    return (
        <>
            <BankAccount />
            <div className={styles.categoryContainer}>
                <div className={styles.category}>
                    <h1 className={fontCss.bold}>모임</h1>
                    <p>{dummys.length}</p>
                </div>
                {dummys.length !== 0 &&
                    <button className={`${styles.joinButton} ${fontCss.bold}`}>모임 입장</button>
                }
            </div>
            {dummys.map((dummy: Dummy) => {
            return (
                <MeetGroup dummy={dummy} />
            )
            })}
            {dummys.length == 0 ? <MeetJoin /> : <MeetJoinButton />}
            <MeetCreateButton />
            <MeetJoinModal />
        </>
    );
}
