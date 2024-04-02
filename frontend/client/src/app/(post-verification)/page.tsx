'use client';

import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import BankAccount from './component/BankAccount';
import MeetGroup from '@/app/(post-verification)/component/meets/MeetGroup';
import MeetCreateButton from '@/app/(post-verification)/component/meets/MeetCreateButton';
import MeetJoinButton from '@/app/(post-verification)/component/meets/MeetJoinButton';
import MeetJoinCard from '@/app/(post-verification)/component/meets/MeetJoinCard';
import MeetJoinModal from '@/app/(post-verification)/component/meets/MeetJoinModal';
import MeetCreateModal from '@/app/(post-verification)/component/meets/MeetCreateModal';
import * as styles from '@/styles/main/main.css';
import * as fontStyles from '@/styles/fonts.css';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { MeetData } from '@/model/meet';
import { getCookie } from '@/util/getCookie';
import { getAccount } from '@/api/account';
import { Meet } from '@/model/meet/meets';

export default function Main() {
  const token = getCookie('accessToken');
  const queryClient = useQueryClient();
  const meetList: Meet[] | undefined = queryClient.getQueryData([
    'meetList',
    token,
  ]);

  const [meets, setMeets] = useState<Meet[]>([]);
  const [joinModalVisibility, setJoinModalVisibility] = useState(false);
  const [createModalVisibility, setCreateModalVisibility] = useState(false);

  useEffect(() => {
    if (typeof meetList !== 'undefined') {
      const sortedList = sortMeetData(meetList);
      setMeets(sortedList);
    }
  }, []);

  const joinModalOn = () => {
    console.log('clicked');
    setJoinModalVisibility(true);
  };

  const createModalOn = () => {
    console.log('create clicked');
    setCreateModalVisibility(true);
  };

  const updateStatus = (meetId: number) => {
    if (typeof meetList !== 'undefined') {
      const newData = meets.map((meet) => {
        if (meet.meetId === meetId) {
          return { ...meet, topFixed: !meet.topFixed };
        }
        return meet;
      });
      const sortedList = sortMeetData(newData);
      setMeets(sortedList);
    }
  };

  function sortMeetData(meetDataArray: Meet[]): Meet[] {
    return meetDataArray.sort((a, b) => {
      // topFixed가 true인 데이터 우선 정렬
      if (a.topFixed && !b.topFixed) return -1;
      if (!a.topFixed && b.topFixed) return 1;

      // 두 데이터가 topFixed 상태가 동일할 때
      if (a.topFixed === b.topFixed) {
        // lastPayDate가 null이 아닌 데이터 우선 정렬
        if (a.lastPayDate && b.lastPayDate) {
          const dateComparison =
            new Date(b.lastPayDate).getTime() -
            new Date(a.lastPayDate).getTime();
          if (dateComparison !== 0) return dateComparison;
        } else if (a.lastPayDate && !b.lastPayDate) {
          return -1;
        } else if (!a.lastPayDate && b.lastPayDate) {
          return 1;
        }

        // createdAt이 null이 아닌 데이터 우선 정렬
        const aCreatedAt = a.createdAt
          ? new Date(a.createdAt).getTime()
          : new Date().getTime();
        const bCreatedAt = b.createdAt
          ? new Date(b.createdAt).getTime()
          : new Date().getTime();
        return bCreatedAt - aCreatedAt;
      }

      return 0;
    });
  }

  if (typeof meets === 'undefined') {
    return <></>;
  } else {
    return (
      <>
        <div className={styles.accountContainer}>
          <BankAccount />
        </div>
        <div className={styles.categoryContainer.default}>
          <div className={styles.category}>
            <h3 className={fontStyles.bold}>모임</h3>
            <p>{meets?.length}</p>
          </div>
          {typeof meets !== 'undefined' && meets.length !== 0 && (
            <button className={`${fontStyles.bold}`} onClick={joinModalOn}>
              모임 입장
            </button>
          )}
        </div>
        {typeof meets !== 'undefined' &&
          meets.map((meet: Meet) => {
            return (
              <MeetGroup
                meet={meet}
                key={meet.meetId}
                updateIsFixed={() => updateStatus(meet.meetId)}
              />
            );
          })}
        {typeof meets !== 'undefined' && meets.length === 0 ? (
          <MeetJoinCard />
        ) : (
          <MeetJoinButton onClick={joinModalOn} />
        )}
        <MeetCreateButton onClick={createModalOn} />
        <MeetJoinModal
          isJoinModalOn={joinModalVisibility}
          clickJoinModal={() => {
            setJoinModalVisibility(false);
          }}
          clickExitModal={() => {
            setJoinModalVisibility(false);
          }}
        />
        <MeetCreateModal
          isCreateMeetModalOn={createModalVisibility}
          clickCreate={() => {
            setCreateModalVisibility(false);
          }}
          clickExitCreate={() => {
            setCreateModalVisibility(false);
          }}
        />
      </>
    );
  }
}
