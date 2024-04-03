import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getDate } from '@/util/dateFormat';
import { faker } from '@faker-js/faker';
import * as style from '@/styles/mypage/unpaidInfo.css'; // 스타일 임포트
import { getCookie } from '@/util/getCookie';
import { getDebts } from '@/api/debts';
import { useState, useEffect } from 'react';
import { Result, ApiResponse } from '@/model/debts';
import * as styles from '@/styles/mypage/debts.css';
type Info = {
  name: string;
  profile: string;
  amount: number;
  type: string;
  createdAt: string | null;
};

export default function UnpaidInfo() {
  const token = getCookie('accessToken') as string;
  const route = useRouter();
  const [response, setResponse] = useState<ApiResponse | undefined>();
  const [unpaidInfo, setUnpaidInfo] = useState<Info>();
  const getDebtsRequest = async () => {
    try {
      const response = await getDebts(token);
      setResponse(response);
      // console.log('Verification response:', response);
    } catch (error) {}
  };

  const formatDate = (inputDate: string | null | undefined): string => {
    if (inputDate === null || inputDate === undefined) {
      return '';
    }

    // Date 객체를 생성합니다.
    const date = new Date(inputDate);

    // 연도, 월, 일을 각각 가져옵니다.
    // getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const year = date.getFullYear();
    // 월과 일이 한 자릿수일 경우 앞에 '0'을 붙여줍니다.
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    // 원하는 형식으로 날짜를 반환합니다.
    return `${year}.${month}.${day}`;
  };

  const processData = (response: ApiResponse | undefined) => {
    if (!response) {
      return;
    }
    let dataToSave: Info = {
      name: '',
      profile: '',
      amount: 0,
      type: '',
      createdAt: null,
    };

    // myLent에서 payback이 false인 요소 찾기
    const unpaidLentItem = response?.result?.myLent?.find((item) => !item.payback);

    if (unpaidLentItem) {
      dataToSave = {
        name: unpaidLentItem.borrowerName,
        profile: unpaidLentItem.borrowerProfile,
        amount: unpaidLentItem.amount,
        type: 'lent',
        createdAt: unpaidLentItem.createdAt,
      };
    } else {
      // myLent에 payback이 false인 요소가 없으면 myBorrowed 확인
      const unpaidBorrowedItem = response?.result?.myBorrowed?.find(
        (item) => !item.payback,
      );
      if (unpaidBorrowedItem) {
        dataToSave = {
          name: unpaidBorrowedItem.lenderName,
          profile: unpaidBorrowedItem.lenderProfile,
          amount: unpaidBorrowedItem.amount,
          type: 'borrowed',
          createdAt: unpaidBorrowedItem.createdAt,
        };
      }
    }
    setUnpaidInfo(dataToSave);
  };

  useEffect(() => {
    getDebtsRequest();
  }, []);

  useEffect(() => {
    // console.log('hello : ' + response);
    processData(response);
  }, [response]);

  return (
    <section className={style.sectionStyle}>
      <div className={style.headerStyle}>
        <p className={style.title}>미정산 내역</p>
        <button
          onClick={() => route.push('mypage/unsettled')}
          className={style.buttonStyle}
        >
          더 보기
        </button>
      </div>
      <div className={style.sectionContent}>
        {unpaidInfo ? (
          unpaidInfo.type === 'lent' ? (
            <>
              <div className={style.text}>
                <p className={style.textStyle}>
                  {formatDate(unpaidInfo.createdAt)}
                </p>
                <p className="text-red-600 text-sm">정산 미완료</p>
              </div>
              <div className={style.detailStyle}>
                <img className={style.imageStyle} src={unpaidInfo.profile} />
                <p className="font-bold">
                  {unpaidInfo.name}님에게 받을 돈이 있어요
                </p>
              </div>
              <div className="flex justify-end w-[100%]"></div>
            </>
          ) : (
            <>
              <div className={style.text}>
                <p className={style.textStyle}>
                  {formatDate(unpaidInfo.createdAt)}
                </p>
                <p className="text-red-600 text-sm">정산 미완료</p>
              </div>
              <div className={style.detailStyle}>
                <img className={style.imageStyle} src={unpaidInfo.profile} />
                <p className="font-bold">
                  {unpaidInfo.name}님에게 갚을 돈이 있어요
                </p>
              </div>
              <div className="flex justify-end w-[100%]">
                <button className={style.actionButtonStyle}>현금 정산</button>
              </div>
            </>
          )
        ) : (
          <div>미정산 내역이 없습니다</div>
        )}
      </div>
    </section>
  );
}
