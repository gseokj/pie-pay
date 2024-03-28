import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {

    if (request.nextUrl.pathname.startsWith('/login')) {
        if (request.cookies.has('accessToken')) {
            return NextResponse.rewrite(new URL('/', request.url));
        }
    } else if (request.nextUrl.pathname.startsWith('/success')) {
        if (request.cookies.has('accessToken')) {
            return NextResponse.rewrite(new URL('/', request.url));
        }
    } else {
        if (!request.cookies.has('accessToken')) {
            return NextResponse.rewrite(new URL('/login', request.url));
        }
    }
}

export const config = {
    matcher: ['/:path', '/login', '/success']
}
