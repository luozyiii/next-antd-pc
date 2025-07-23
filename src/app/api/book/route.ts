import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url);
  const params = url.searchParams;
  try {
    const res = await fetch(`http://81.71.98.176:3000/book/list`, {
      headers: {
        Authorization: 'Bearer ' + params.get('token'),
      },
    });
    const data = await res.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch {
    return new NextResponse('Database Error', { status: 500 });
  }
};
