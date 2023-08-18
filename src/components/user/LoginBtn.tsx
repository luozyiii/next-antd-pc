'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from 'antd';

export default function Component() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return (
      <>
        <span>{userEmail}</span>
        <Button type="link" onClick={() => signOut()}>
          退出
        </Button>
      </>
    );
  }

  return (
    <Button type="link" onClick={() => signIn('github')}>
      登录
    </Button>
  );
}
