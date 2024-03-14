import {http, HttpResponse, StrictResponse} from 'msw'
import {faker} from "@faker-js/faker";


const MeetMembers = [
    {memberId: 1, nickname: "고석주", profileImage: faker.image.avatar()},
    {memberId: 2, nickname: "김준수", profileImage: faker.image.avatar()},
    {memberId: 3, nickname: "함승찬", profileImage: faker.image.avatar()},
    {memberId: 4, nickname: "류지수", profileImage: faker.image.avatar()},
    {memberId: 5, nickname: "성목", profileImage: faker.image.avatar()},
    {memberId: 6, nickname: "재언", profileImage: faker.image.avatar()},
    {memberId: 7, nickname: "고석주", profileImage: faker.image.avatar()},
    {memberId: 8, nickname: "김준수", profileImage: faker.image.avatar()},
    {memberId: 9, nickname: "함승찬", profileImage: faker.image.avatar()},
    {memberId: 10, nickname: "류지수", profileImage: faker.image.avatar()},
    {memberId: 11, nickname: "성목", profileImage: faker.image.avatar()},
    {memberId: 12, nickname: "재언", profileImage: faker.image.avatar()},
]

const menuItems = [{menuName: "족발(대)",menuPrice: 62000, quantity: 1},{menuName: "계란찜",menuPrice: 8000, quantity: 1},{menuName: "참이슬",menuPrice: 5000,quantity: 3},{menuName: "카스", menuPrice: 5000, quantity: 2}]
const menuItems2 = [{menuName: "담배",menuPrice: 4000, quantity: 1},{menuName: "라면",menuPrice: 4000, quantity: 1},{menuName: "참이슬",menuPrice: 5000,quantity: 3},{menuName: "카스", menuPrice: 5000, quantity: 2}]
const paymentResult = [{orderMenuId:1, storeName: "뽕나무족발",address: "서울 강남구 테헤란로4길 15(역삼동)",phone:"010-2839-1132",createdAt: "2024.03.08",menuItems,totalAmount:95000},
    {orderMenuId:2, storeName: "주전부리",address: "서울 강남구 테헤란로4길 15(역삼동)",phone:"010-2839-1132",createdAt: "2024.03.08",menuItems2,totalAmount:20000}]

const delay = (ms: number) => new Promise((res) => {
    setTimeout(res, ms);
})

export const handlers = [
    http.post('/members/login', () => {
        console.log('로그인');
        return HttpResponse.json(MeetMembers[1], {
            headers: {
                'Set-Cookie': 'connect.smemberId=msw-cookie;HttpOnly;Path=/'
            }
        })
    }),
    http.post('/members/join', async ({ request }) => {
        console.log('회원가입');
        return HttpResponse.text(JSON.stringify('ok'), {
            headers: {
                'Set-Cookie': 'connect.smemberId=msw-cookie;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),
    http.post('/members/logout', () => {
        console.log('로그아웃');
        return new HttpResponse(null, {
            headers: {
                'Set-Cookie': 'connect.smemberId=;HttpOnly;Path=/;Max-Age=0'
            }
        })
    }),

    http.get('/meet/:memberMeetId', ({ request, params }) => {
        const { memberMeetId} = params;
        return HttpResponse.json(
            MeetMembers
        )
    }),

    http.post('/pay/parties', () => {
        console.log('만남 참여자 설정');
    }),

    http.post('/pay/instead', () => {
        console.log('대신 내주기 설정');

    }),

    http.post('/pay/qr', () => {
        console.log('qr이 생성됨');

    }),

    http.post('/pay/payment/:payId', ({ request, params }) => {
        console.log('결제가 발생');
        const { payId} = params;
    }),

    http.get('/pay/payment/:payId', ({ request, params }) => {
        console.log('결제내역 조회');
        const { payId} = params;
        const result = payId === "1" ? paymentResult[0] : paymentResult[1];
        return HttpResponse.json(
            result
        )
    }),

    http.post('/pay/payback/:insteadId', ({ request, params }) => {
        console.log('이체 요청');
        const { insteadId} = params;

    }),

];
