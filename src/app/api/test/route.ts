import { NextResponse } from 'next/server';

export const GET = async (request: any) => {
  try {
    return new NextResponse(
      JSON.stringify({
        code: 2000,
        data: '这是本地接口。',
        msg: '我什么都不知道',
      }),
      { status: 200 },
    );
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
