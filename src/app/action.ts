'use server';

import { cookies } from 'next/headers';

const oneDay = 24 * 60 * 59 * 1000; // 24 hours 少一分钟

async function saveToken(token: string) {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'token', value: token, expires: Date.now() + oneDay });
}

async function saveUserInfo(userInfo: Record<string, unknown>) {
  const cookieStore = await cookies();
  cookieStore.set({ name: 'userInfo', value: JSON.stringify(userInfo), expires: Date.now() + oneDay });
}

async function clearCookies() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  cookieStore.delete('userInfo');
}

export { clearCookies, saveToken, saveUserInfo };
