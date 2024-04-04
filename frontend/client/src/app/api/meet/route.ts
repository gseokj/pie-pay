import {NextResponse, NextRequest} from "next/server";
import axios from "axios";


export async function POST(req: NextRequest, res: NextResponse) {

    const token = await req.cookies.get('accessToken');
    const value = token?.value;

    const meetData = await req.json();

    if (typeof value === 'undefined') {
        return NextResponse.json({ status: 403 });
    } else {
        try {
            const response = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/meet`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${value}`
                },
                body: JSON.stringify(meetData),
            })).json();

            console.log(response);

            return NextResponse.json({ data: response}, { status: 201 });
        } catch (error) {
            return NextResponse.json({ error: error}, { status: 500 });
        }
    }
}