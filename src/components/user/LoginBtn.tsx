'use client';

import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { clearCookies } from '@/app/action';
import type { UserInfo } from '@/types';

interface LoginBtnProps {
  token?: string;
  userInfo?: UserInfo;
}

export default function Component({ token, userInfo = { username: '' } }: LoginBtnProps) {
  const router = useRouter();

  const signIn = () => {
    router.push('/login');
  };

  const signOut = () => {
    clearCookies();
    router.push('/login');
  };

  if (token) {
    return (
      <>
        <span>{userInfo?.username}</span>
        <Button style={{ color: 'rgb(244, 142, 142)' }} type="link" onClick={() => signOut()}>
          退出
        </Button>
      </>
    );
  }

  return (
    <Button style={{ color: '#1da57a' }} type="link" onClick={() => signIn()}>
      登录
    </Button>
  );
}
