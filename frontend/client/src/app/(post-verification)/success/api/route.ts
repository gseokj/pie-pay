import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(request: NextRequest, response: NextResponse) {
    let res = NextResponse.next()

    const params = request.nextUrl.searchParams;
    const accessToken = params.get("accessToken");
    const refreshToken = params.get("refreshToken");

    if (typeof accessToken === 'string' && typeof refreshToken === 'string') {

        cookies().set('accessToken', `${accessToken}`, {
            httpOnly: true,
            path: '/',
            sameSite: 'none',
            secure: true
        });
        cookies().set('refreshToken', refreshToken, {
            httpOnly: true,
            path: '/',
            sameSite: 'none',
            secure: true
        });

        res.cookies.set('accessToken', accessToken);
        res.cookies.set('refreshToken', refreshToken);

        console.log('token saved.');

        return NextResponse.json({ status: 200 });
    } else {
        return NextResponse.json({ status: 400 });
    }
}