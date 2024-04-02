'use client'

import * as styles from '@/styles/store/store.css';
import XBackButton from '@/app/(store)/component/XBackButton';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { getStoreReceipt } from '@/api/store';
import { getCookie } from '@/util/getCookie';
import CheckModal from '@/app/(store)/component/CheckModal';
import { useCheckModal } from '@/store/useCheckModal';
import { LoaderComponent } from '@/app/component/Loading';
type Props=
{
  params: {
    payId: string
  }
}
export default function Page({params}: Props) {
  const {payId} = params;
  const cookie = getCookie('accessToken');
  const {isVisible,updateState}  = useCheckModal();
  const { data: receipt, isLoading, error } = useQuery({queryKey: ['store',payId,cookie], queryFn: getStoreReceipt})
console.log(receipt);

  return (
    <>
      {!isLoading && receipt ?
      <div className="flex flex-col h-[100%] m-3">

        {isVisible && <CheckModal payId={Number(payId)}/>}
        <div>
          <XBackButton />
        </div>
        <div className={styles.content}>
          <p className={styles.paragraph}>{receipt.store?.storeName}</p>
          <ul className={styles.ul.store}>
            <li>{receipt.store?.address}</li>
            <li>{receipt.store?.phone}</li>
          </ul>
          <hr />
          <ul className={styles.ul.menu}>
            <li>메뉴명</li>
            <li>가격</li>
            <li>수량</li>
            <li>합계</li>
          </ul>
          <hr />
          {receipt?.newOrderMenusResponse?.map((menuItem, index) => (
            <ul key={index} className={styles.ul.menu}>
              <li>{menuItem.menu.menuName}</li>
              <li>{menuItem.menu.menuPrice}</li>
              <li>{menuItem.quantity}</li>
              <li>{menuItem.menu.menuPrice * menuItem.quantity}</li>
            </ul>
          ))}

          <hr />
          <ul className={styles.ul.menu}>
            <li />
            <li />
            <li />
            <li>{receipt?.totalAmount}</li>
          </ul>
        </div>
        <button onClick={updateState} className={styles.button}>결제하기</button>

      </div>

      : <LoaderComponent/>}

    </>

  );
}