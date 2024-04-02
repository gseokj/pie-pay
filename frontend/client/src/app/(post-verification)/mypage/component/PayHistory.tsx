import { useRouter } from 'next/navigation';
import { faker } from '@faker-js/faker';
import { getDate } from '@/util/dateFormat';
import * as style from '@/styles/mypage/payHistory.css';
import { getPayHistory } from '@/api/pay';

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

// const getDate = () => {
//   getPayHistory();
// };

export default function PayHistory() {
  const route = useRouter();
  return (
    <section className={style.section}>
      <div className={style.header}>
        <p className={style.headerText}>결제 내역</p>
        <button
          onClick={() => route.push('mypage/payment-list')}
          className={style.moreButton}
        >
          더 보기
        </button>
      </div>
      <div className={style.content}>
        <div className={style.detail}>
          <p className={style.detailText}>
            {getDate(new Date(Payment.createAt))}
          </p>
          <p className={style.statusText}>정산 완료</p>
        </div>
        <div className="flex flex-col">
          <p className={style.mainText}>{Payment.meet.meetName}</p>
          <p className={style.storeName}>{Payment.receipt.storeName}</p>
        </div>
        <div className={style.amountText}>
          <p>{Payment.receipt.totalAmount.toLocaleString()} 원</p>
        </div>
      </div>
    </section>
  );
}
