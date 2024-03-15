import {QueryFunction} from "@tanstack/query-core";
import {Member} from "@/model/member";

// export const initParticipant: QueryFunction<Member[]> = async ({queryKey}) => {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_MOCK_BASE_URL}/meet/${queryKey}`, {
//         credentials: 'include',
//         cache: 'no-store',
//     });
//
//     if (!res.ok) {
//         throw new Error('Failed to fetch data')
//     }
//
//     // 빈 객체 반환
//     return {};
// }
