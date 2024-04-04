import {NextResponse, NextRequest} from "next/server";
import {cookies} from "next/headers";

export async function GET(req: NextRequest) {
    console.log('request in.................................................', cookies().has('accessToken'));

    if (cookies().has('accessToken')) {
        console.log('success.......................................................');
        return NextResponse.json({ data: cookies().get('accessToken') }, { status: 200 });
    } else {
        console.log('fail.......................................................');
        return NextResponse.json({ data: 'no,...........' }, { status: 400 });
    }
}
