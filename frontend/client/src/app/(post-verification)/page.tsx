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
import CurrentParticipation from '@/app/(post-verification)/component/CurrenPayment';
import CurrentPayment from '@/app/(post-verification)/component/CurrenPayment';
import { CurrPayment } from '@/model/participant';
import { useSSE } from '@/store/useSSE';
import { useRouter } from 'next/navigation';
import { extractBracketedString } from '@/util/extractBracketedString'

export default function Main() {
  const token = getCookie('accessToken');
  const queryClient = useQueryClient();
  const [count, setCount] = useState();
  const router = useRouter();
  useEffect(() => {
    // const { data: , isLoading, error } = useQuery({queryKey: ['tt','eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJwaWUiLCJleHAiOjEwNzEyMDQwMjkwLCJzdWIiOiJoZ29hMjAwMEBuYXZlci5jb20iLCJyb2xlcyI6IlJPTEVfQ0VSVElGSUVEIn0.JNJLVteOJ8Vh84uxpxcKPQLEUl8fimjsKWF7dI6CBb8'], queryFn: connectSSE}) ;    console.log(1);
    // console.log(a);a
  }, []);


  const meetList: Meet[] | undefined = queryClient.getQueryData([
    'meetList',
    token,
  ]);

  const [meets, setMeets] = useState<Meet[]>([]);
  const [joinModalVisibility, setJoinModalVisibility] = useState(false);
  const [createModalVisibility, setCreateModalVisibility] = useState(false);
  const [SSEPayment, setSSEPayment] = useState<CurrPayment[]>([]);

  useEffect(() => {
    if (typeof meetList !== 'undefined') {
      const sortedList = sortMeetData(meetList);
      setMeets(sortedList);
    }
  }, [token]);

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
  const {SSEnotification} =useSSE();

  const currPayments = queryClient.getQueryData<CurrPayment[]>(['currPayment', token]);
  const handleReplace = (payId:number) => {
      router.push(`/5/payment/approve/${payId}`)
  };

  useEffect(() => {
    if(!SSEnotification || !SSEnotification.message || SSEnotification.referenceId!=2) return;
    const payId = SSEnotification.destinationId;
    const meetName = extractBracketedString(SSEnotification.message);
    setSSEPayment(prevState => [ ...prevState, {meetName:meetName,payId:payId,updatedAt:new Date().toISOString()} as CurrPayment ]);


  }, [SSEnotification]);
  if (typeof meets === 'undefined') {
    return <></>;
  } else {
    return (
      <>
        {SSEPayment
          ?.filter(currPayment => ((new Date()).valueOf() - (new Date(currPayment.updatedAt)).valueOf()) / 1000 <= 100)
          .map(currPayment => (
            <CurrentPayment key={currPayment.payId} {...currPayment} handleReplace={handleReplace} />
          ))}
        {currPayments
          ?.filter(currPayment => ((new Date()).valueOf() - (new Date(currPayment.updatedAt)).valueOf()) / 1000 <= 100)
          .map(currPayment => (
            <CurrentPayment key={currPayment.payId} {...currPayment} handleReplace={handleReplace} />
          ))}
        <div className={styles.accountContainer}>

          <BankAccount />
        </div>
        {count}
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
