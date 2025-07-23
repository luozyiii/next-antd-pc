import React from 'react';
import { cookies } from 'next/headers';
import { CustomLayout } from '@/components';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value || '';
  const _userInfoStr = cookieStore.get('userInfo')?.value;
  const userInfo = _userInfoStr ? JSON.parse(_userInfoStr || '{}') : {};

  return (
    <CustomLayout token={token} userInfo={userInfo}>
      {children}
    </CustomLayout>
  );
};

export default Layout;
