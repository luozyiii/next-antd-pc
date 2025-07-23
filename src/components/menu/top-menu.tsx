'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'antd';
import ThemeContent from '../page/theme-content';
import type { MenuProps } from 'antd';

interface TopMenuProps {
  items: Array<{
    key: string;
    label: string;
    redirect?: string;
    [key: string]: unknown;
  }>;
}

const TopMenu: React.FC<TopMenuProps> = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const _selectedKeys = pathname?.split('/')[1] || '';

  const getPath = (key: string) => {
    const target = items?.find((item) => item.key === key);
    let path = '/' + key;
    if (target?.redirect) {
      path = target.redirect;
    }
    return path;
  };

  const onClick: MenuProps['onClick'] = (e) => {
    const lathPath = getPath(e.key);
    router.push(lathPath);
  };
  return (
    <ThemeContent>
      <Menu onClick={onClick} selectedKeys={[_selectedKeys]} mode="horizontal" items={items as never} />
    </ThemeContent>
  );
};

export default TopMenu;
