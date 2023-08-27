'use server';

import { cookies } from 'next/headers';

async function saveToken(token: string) {
  cookies().set({
    name: 'token',
    value: token,
  });
}

async function saveUserInfo(userInfo: any) {
  cookies().set({
    name: 'userInfo',
    value: JSON.stringify(userInfo),
  });
}

async function clearCookies() {
  cookies().delete('token');
  cookies().delete('userInfo');
}

export { saveToken, saveUserInfo, clearCookies };
