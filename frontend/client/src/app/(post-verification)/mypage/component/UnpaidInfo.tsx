import { useRouter } from 'next/navigation';
import { getDate } from '@/util/dateFormat';
import { faker } from '@faker-js/faker';
import * as style from '@/styles/mypage/unpaidInfo.css'; // 스타일 임포트
const Borrower = {
  memberId: 5,
  profileImage: faker.image.avatar(),
  nickname: '속석주',
};
const UnsettledBox = {
  createAt: new Date().toString(),
  Borrower: Borrower,
};
const Meet = {
  meetId: 1,
  meetName: '갈까마귀모임',
  meetImage: faker.image.avatar(),
};

const Receipt = {
  payId: 1,
  storeName: '(주) 뽕족 강남점',
  totalAmount: 40500,
};
const Payment = {
  createAt: new Date().toString(),
  meet: Meet,
  receipt: Receipt,
};

export default function UnpaidInfo() {
  const route = useRouter();

  return (
    <section className={style.sectionStyle}>
      <div className={style.headerStyle}>
        <p className={style.textStyle}>미정산 내역</p>
        <button
          onClick={() => route.push('mypage/unsettled')}
          className={style.buttonStyle}
        >
          더 보기
        </button>
      </div>
      <div className={style.sectionContent}>
        <div className={style.text}>
          <p className={style.textStyle}>
            {getDate(new Date(UnsettledBox.createAt))}
          </p>
          <p className="text-red-600 text-sm">정산 미완료</p>
        </div>
        <div className={style.detailStyle}>
          <img
            className={style.imageStyle}
            src={UnsettledBox.Borrower.profileImage}
          />
          <p className="font-bold">
            {UnsettledBox.Borrower.nickname}님에게 받을 돈이 있어요
          </p>
        </div>
        <div className="flex justify-end w-[100%]">
          <button className={style.actionButtonStyle}>현금 정산</button>
        </div>
      </div>
    </section>
  );
}
