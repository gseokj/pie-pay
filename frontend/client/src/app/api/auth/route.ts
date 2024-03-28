import {NextResponse, NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    console.log('request in.................................................');
    console.log(req.cookies.has('accessToken'));

    if (req.cookies.has('accessToken')) {
        console.log('success.......................................................');
        return NextResponse.json({ data: req.cookies.get('accessToken')}, { status: 200 });
    } else {
        console.log('fail.......................................................');
        return NextResponse.json({ data: req.cookies.get('accessToken') }, { status: 400 });
    }
}