"use server";


import {NextResponse, NextRequest} from "next/server";


export async function GET(req: NextRequest, res: NextResponse) {

  const token = req.cookies.get('accessToken');
  const value = token?.value;
  console.log(token, 'token!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11');
  console.log(req.cookies.has('accessToken'));

  if (typeof value === 'undefined') {
    return NextResponse.json({ status: 999 });
  } else {
    try {
      const response = await (await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/member/meets`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Bearer ${value}`
        },
      })).json();

      console.log(response, '!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11');

      return NextResponse.json({ data: response}, { status: 201 });
    } catch (error) {
      return NextResponse.json({ error: error}, { status: 500 });
    }
  }
}