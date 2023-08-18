import React from 'react';
import { CustomLayout } from '@/components';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <CustomLayout>{children}</CustomLayout>;
};

export default Layout;
