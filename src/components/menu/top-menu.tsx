'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import ThemeContent from '../page/theme-content';

interface TopMenuProps {
  items: any[];
}

const TopMenu: React.FC<TopMenuProps> = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const _selectedKeys = pathname?.split('/')[1];

  const getPath = (key: string) => {
    const target = items?.find((item: any) => item.key === key);
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
      <Menu onClick={onClick} selectedKeys={[_selectedKeys]} mode="horizontal" items={items} />
    </ThemeContent>
  );
};

export default TopMenu;
