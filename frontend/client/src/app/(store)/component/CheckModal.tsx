'use client'

import { useCheckModal } from '@/store/useCheckModal';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { getCookie } from '@/util/getCookie';
import { useRouter } from 'next/navigation';
import * as styles from '@/styles/store/storeModal.css'
import { LoaderComponent } from '@/app/component/Loading';
type Props={
  payId: number;
}

export default function CheckModal({payId}:Props){
  const route = useRouter();
  const {isPending, mutate } = useMutation({

    mutationFn: (id) => axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/pay/payment/${payId}`,{},
      {
        headers: {
          'Authorization': `Bearer ${getCookie('accessToken')}`
        }}),
    onSuccess: (response) => {
      console.log("결제성공!");
      route.replace("/");
    },
    onError: (e) => { console.error('에러 발생'+e) },
    onSettled: () => { console.log('결과에 관계 없이 무언가 실행됨') }
  });
  const {updateState}  = useCheckModal();
  return(
    <div>
      {!isPending ?<>
      <div onClick={updateState} className={styles.background}></div>
    <div className={styles.container}>
    <div
      className="group select-none w-[100%] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
    >
      <div className="">
        <div className="text-center p-3 flex-auto justify-center">
          <svg
            className="animate-bounce w-12 h-12 flex items-center text-gray-600 fill-green-500 mx-auto"
            xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
            <path
              d="M240-80q-50 0-85-35t-35-85v-120h120v-560l60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60 60 60 60-60v680q0 50-35 85t-85 35H240Zm480-80q17 0 28.5-11.5T760-200v-560H320v440h360v120q0 17 11.5 28.5T720-160ZM360-600v-80h240v80H360Zm0 120v-80h240v80H360Zm320-120q-17 0-28.5-11.5T640-640q0-17 11.5-28.5T680-680q17 0 28.5 11.5T720-640q0 17-11.5 28.5T680-600Zm0 120q-17 0-28.5-11.5T640-520q0-17 11.5-28.5T680-560q17 0 28.5 11.5T720-520q0 17-11.5 28.5T680-480ZM240-160h360v-80H200v40q0 17 11.5 28.5T240-160Zm-40 0v-80 80Z" />
          </svg>
          <h2 className="text-xl font-bold py-4 text-gray-200">결제할까요?</h2>
          <p className="font-bold text-sm text-gray-500 px-2">
            영수증을 확인해주세요!
          </p>
        </div>
        <div className="p-2 mt-2 text-center space-x-1 md:block">
          <button onClick={updateState}
            className="mr-3 bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300"
          >
            취소
          </button>
          <button onClick={() => mutate()}
                  className="bg-green-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-green-500 hover:border-green-500 text-white hover:text-green-500 rounded-full transition ease-in duration-300"
          >
            결제
          </button>
        </div>
      </div>
    </div>

    </div></> : <LoaderComponent/> }
    </div>);
}