// // fetchData.ts
// import { useQuery } from '@tanstack/react-query';
// import { useStore } from '../stores/meet';
//
// const path = process.env.NEXT_PUBLIC_MOCK_BASE_URL;
//
// export const fetchMeetMembers = async (memberMeetId: number) => {
//     const response = await fetch(`${path}/meet/${memberMeetId}`);
//     if (!response.ok) {
//         throw new Error('Failed to fetch meet members');
//     }
//     return response.json();
// };
//
// export const useMeetMembers = (memberMeetId: number) => {
//     const { data, error, isLoading } = useQuery(['meetMembers', memberMeetId], () => fetchMeetMembers(memberMeetId));
//
//     // Assuming `setMembers` is a function to set members in your store
//     const setMembers = useStore((state) => state.setMembers);
//
//     if (isLoading) return 'Loading...';
//
//     if (error) return 'An error has occurred: ' + error.message;
//
//
//     return data;
// };