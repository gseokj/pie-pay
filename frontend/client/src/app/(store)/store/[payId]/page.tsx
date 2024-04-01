import * as styles from '@/styles/store/store.css';
import { getDateAndTime } from '@/util/dateFormat';
import XBackButton from '@/app/(store)/component/XBackButton';


export default function Page() {
  return (
    <div className="flex flex-col h-[100%] m-3">
      <div>
        <XBackButton />
      </div>
      <div className={styles.content}>
        <p className={styles.paragraph}>학동식당</p>
        <ul className={styles.ul.store}>
          <li>0102839</li>
          <li>서울시 송파구</li>
          <li>2024</li>
        </ul>
        <hr />
        <ul className={styles.ul.menu}>
          <li>메뉴명</li>
          <li>가격</li>
          <li>수량</li>
          <li>합계</li>
        </ul>
        <hr />
        {/*{ paymentResult.orderMenus.map((menuItem) => (*/}
        <ul className={styles.ul.menu}>
          <li>밥</li>
          <li>4000</li>
          <li>2</li>
          <li>8000</li>
        </ul>

        {/*))}*/}
        <ul className={styles.ul.menu}>
          <li>밥</li>
          <li>4000</li>
          <li>2</li>
          <li>8000</li>
        </ul>

        <hr />
        <ul className={styles.ul.menu}>
          <li />
          <li />
          <li />
          <li>42000</li>
        </ul>
      </div>
    </div>


  );
}