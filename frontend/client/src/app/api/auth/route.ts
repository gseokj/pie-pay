import {NextResponse, NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    console.log('request in.................................................')
    const token = await req.cookies.get('accessToken');
    const value = token?.value;

    const t = JSON.stringify(token);
    console.log(token, "root token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    if (typeof token?.value === 'string') {
        return NextResponse.json({ data: token}, { status: 200 });
    } else {
        return NextResponse.json({ data: token }, { status: 400 });
    }
}