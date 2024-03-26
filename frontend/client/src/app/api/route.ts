import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse, NextRequest} from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
    const token = await req.cookies.get('accessToken');
    const value = token?.value;
    if (typeof token === 'string') {
        return new NextResponse(token);
    } else {
        return NextResponse.json({ status: 400 });
    }
}