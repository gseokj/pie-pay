import BackButton from '@/app/(post-verification)/component/BackButton';
import React from 'react';
import Image from 'next/image';
import vailedLeftButton from '@/assets/icons/vailedLeftButton.svg';
import unvailedRightButton from '@/assets/icons/unvailedRightButton.svg';
import { faker } from '@faker-js/faker';
import { getDate } from '@/util/dateFormat';
import dropdown from '@/assets/icons/dropdown.svg';
import dropup from '@/assets/icons/dropup.svg';

const Me = {
  memberId: 1,
  profileImage: faker.image.avatar(),
  nickname: '함승찬짱',
  phoneNumber: '010-2839-1132',
};
const Member1 = {
  memberId: 4,
  profileImage: faker.image.avatar(),
  nickname: '속석주',
};
const Member2 = {
  memberId: 4,
  profileImage: faker.image.avatar(),
  nickname: '속석주',
};
const Member3 = {
  memberId: 4,
  profileImage: faker.image.avatar(),
  nickname: '속석주',
};
const result = [{
  borrower: Member1,
  lender: Me,
  amount: 20000,
  isPayBack: true,
  createdAt: new Date().toString(),

},
  {
    borrower: Member2,
    lender: Me,
    amount: 40000,
    isPayBack: false,
    createdAt: new Date().toString(),

  },
  {
    borrower: Me,
    lender: Member1,
    amount: 20000,
    isPayBack: true,
    createdAt: new Date().toString(),

  },
  {
    borrower: Me,
    lender: Member3,
    amount: 20000,
    isPayBack: true,
    createdAt: new Date().toString(),

  }];
export default function Unsettled() {
  return (

    <div className="absolute top-0 right-0 bottom-0 left-0 bg-white z-50 p-4">
      <article className="flex justify-between mb-5">
        <BackButton />
        <p className="font-bold text-lg">미정산 내역</p>
        <div />
      </article>
      <section className="h-[18%] ">
        {/*년 월 구간*/}
        <div className="w-[50%] flex justify-between mb-5 ">
          <button><Image src={vailedLeftButton} alt="" /></button>
          <p className="font-bold text-xl">2024년 3월</p>
          <button><Image src={unvailedRightButton} alt="" /></button>
        </div>

        <div className="flex p-5 bg-white shadow-2xl rounded-xl mb-5">
          <div className="flex flex-col w-[50%]">
            <p className="text-gray-500">대신 내준 금액</p>
            <p
              className="font-bold text-xl">{result.filter(member => member.lender === Me).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} 원</p>
            <div className="flex mt-3">
              {(result.filter(member => member.lender === Me).map(member => <img
                className="w-[30px] h-[30px] rounded-full mr-1"
                src={member.borrower.profileImage} />))}
            </div>

          </div>
          <div className="w-[50%]">
            <p className="text-gray-500">받은 금액</p>
            <p
              className="font-bold text-xl">{result.filter(member => member.lender === Me).filter((borrower) => borrower.isPayBack).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} 원</p>
            <div className="flex mt-3">
              {(result.filter(member => member.lender === Me).filter((borrower) => borrower.isPayBack).map(member =>
                <img
                  className="w-[30px] h-[30px] rounded-full mr-1"
                  src={member.borrower.profileImage} />))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <p className="font-bold text-xl">미정산 건수 {result.filter((borrower) => !borrower.isPayBack).length}</p>
          <div className="flex text-gray-500">
            <Image src={dropdown} alt="" width={20} height={20} />
            <Image src={dropup} alt="" width={20} height={20} />
            <p className="ml-3">최신순</p>
          </div>
        </div>
        {result.map((borrower) => (
          // 로그인 한 회원 입장 => 빌린 사람 목록이다.
          <>{borrower.lender!=Me &&
            <div className="flex flex-col  justify-between p-4 bg-white rounded-xl shadow-xl mb-3">
              <div className="flex">
                <p className="mr-3 text-sm text-gray-500">{getDate(new Date(borrower.createdAt))}</p>
                {!borrower.isPayBack && <p className="text-red-600 text-bold text-sm">정산 미완료</p>}
                {borrower.isPayBack && <p className="text-green-500 text-bold text-sm">정산 완료</p>}
              </div>
              <div className="flex items-center">
                <img className="w-[10%] rounded-full mr-3" src={borrower.borrower.profileImage} />
                <p className="font-bold">{borrower.borrower.nickname}님에게 갚을 돈</p>
              </div>
              <div className="flex justify-between w-[100%]">
                <p className="font-bold">{borrower.amount.toLocaleString()} 원</p>
                {!borrower.isPayBack && <button className="bg-sky-300 rounded-2xl w-[30%] p-1">현금 정산</button>}
              </div>
            </div>
          }
            {/* 로그인 한 회원 입장 => 빌려준 사람 목록이다.*/}
            {borrower.borrower!=Me &&
              <div className="flex flex-col  justify-between p-4 bg-white rounded-xl shadow-xl mb-3">
                <div className="flex">
                  <p className="mr-3 text-sm text-gray-500">{getDate(new Date(borrower.createdAt))}</p>
                  {!borrower.isPayBack && <p className="text-red-600 text-bold text-sm">정산 미완료</p>}
                  {borrower.isPayBack && <p className="text-green-500 text-bold text-sm">정산 완료</p>}
                </div>
                <div className="flex items-center">
                  <img className="w-[10%] rounded-full mr-3" src={borrower.borrower.profileImage} />
                  <p className="font-bold">{borrower.borrower.nickname}님에게 받을 돈이 있어요</p>
                </div>
                <div className="flex justify-between w-[100%]">
                  <p className="font-bold">{borrower.amount.toLocaleString()} 원</p>
                  {!borrower.isPayBack && <button className="bg-sky-300 rounded-2xl w-[30%] p-1">현금 정산</button>}
                </div>
              </div>
            }
          </>
        ))}
      </section>

    </div>);
}