'use client'

import { useQuery } from '@tanstack/react-query';
import { getReceipt } from '@/api/receipt';

type Props = { payId: string }
export default function Receipt({ payId }: Props) {
  const { data: receipt, isLoading, error } = useQuery({ queryKey: ['receipt', payId], queryFn: getReceipt });
  return (<div className="flex flex-col justify-between h-[70%] ml-5">
    <p className="text-2xl font-bold ">{receipt?.storeName}</p>
    <ul className="mb-5 ">
      <li>{receipt?.phone}</li>
      <li>{receipt?.address}</li>
      <li>{receipt?.createdAt}</li>
    </ul>
    <ul className="flex justify-around">
      <li style={{ width: '25%' }}>메뉴명</li>
      <li style={{ width: '25%' }}>가격</li>
      <li style={{ width: '25%' }}>수량</li>
      <li style={{ width: '25%' }}>합계</li>
    </ul>
    <hr />
    {receipt && receipt.menuItems && receipt?.menuItems.map((menuItem) => (
      <ul className="flex justify-around" key={menuItem.menuName}>
        <li style={{ width: '25%' }}>{menuItem.menuName}</li>
        <li style={{ width: '25%' }}>{menuItem.menuPrice}</li>
        <li style={{ width: '25%' }}>{menuItem.quantity}</li>
        <li style={{ width: '25%' }}>{menuItem.menuPrice * menuItem.quantity}</li>
      </ul>
    ))}
    <hr className="border-2" />
    <ul className="flex justify-around">
      <li className="w-[75%]"></li>
      <li style={{ width: '25%' }}>{receipt?.totalAmount}</li>
    </ul>
  </div>);
}