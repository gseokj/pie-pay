import { ReactNode } from 'react';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import {getMyDebtList, getMyPayments} from "@/api/user/payment";


type Props = {
  children: ReactNode;
};

export default async function MyPage({ children }: Props) {
  const queryClient = new QueryClient();
  const token = cookies().get('accessToken')?.value;

  await queryClient.prefetchQuery({ queryKey: ['userPayments', token], queryFn: getMyPayments });
  await queryClient.prefetchQuery({ queryKey: ['userDebts', token], queryFn: getMyDebtList });
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </>
  );
}
