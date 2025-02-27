import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/kakaologin') || request.nextUrl.pathname.startsWith('/success') || request.nextUrl.pathname.startsWith('/auth')) {
        if (request.cookies.has('accessToken')) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    } else {
        if (!request.cookies.has('accessToken')) {
            return NextResponse.redirect(new URL('/kakaologin', request.url));
        }
    }

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
