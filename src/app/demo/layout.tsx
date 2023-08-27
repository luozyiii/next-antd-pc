import React from 'react';
import { cookies } from 'next/headers';
import { CustomLayout } from '@/components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const token = cookies().get('token')?.value || '';
  const _userInfoStr = cookies().get('userInfo')?.value;
  const userInfo = _userInfoStr ? JSON.parse(_userInfoStr || '{}') : {};

  return (
    <CustomLayout token={token} userInfo={userInfo}>
      {children}
    </CustomLayout>
  );
};

export default Layout;
