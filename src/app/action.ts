'use server';

import { cookies } from 'next/headers';

const oneDay = 24 * 60 * 59 * 1000; // 24 hours 少一分钟

async function saveToken(token: string) {
  cookies().set({
    name: 'token',
    value: token,
    expires: Date.now() + oneDay,
  });
}

async function saveUserInfo(userInfo: any) {
  cookies().set({
    name: 'userInfo',
    value: JSON.stringify(userInfo),
    expires: Date.now() + oneDay,
  });
}

async function clearCookies() {
  cookies().delete('token');
  cookies().delete('userInfo');
}

export { saveToken, saveUserInfo, clearCookies };
