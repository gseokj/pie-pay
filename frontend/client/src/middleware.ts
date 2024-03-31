import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {MyInfo} from "@/model/user";

export function middleware(request: NextRequest) {
    console.log(request.cookies.has('accessToken'), 'in middleware......................................');

    if (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/success') || request.nextUrl.pathname.startsWith('/auth')) {
        if (request.cookies.has('accessToken')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else if (request.nextUrl.pathname.startsWith('/mypage')) {
        if (!request.cookies.has('accessToken')) {
            return NextResponse.redirect(new URL('/', request.url));
        } else {
            const userCookie = request.cookies.get('myInfo');
            if (typeof userCookie?.value === 'string') {
                const userInfo: MyInfo = JSON.parse(userCookie.value);
                const userId = userInfo.memberId;
                console.log('in middleware.... userId is.....,', userId);
            }
        }
    } else {
        if (!request.cookies.has('accessToken')) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}