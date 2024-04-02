import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {MyInfo} from "@/model/user";

export function middleware(request: NextRequest) {
    // console.log(request.cookies.has('accessToken'), 'in middleware......................................');

}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)'
    ]
}
