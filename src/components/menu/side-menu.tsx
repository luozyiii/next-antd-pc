'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { getAllPath } from '@/routes/utils';
import ThemeContent from '../page/theme-content';
import type { TreeItem } from '@/types';
import type { MenuProps } from 'antd';

interface SideMenuProps {
  items: TreeItem[];
}

const SideMenu: React.FC<SideMenuProps> = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const _openKeys = getAllPath(pathname);

  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key);
  };

  return (
    <ThemeContent>
      <Menu
        mode="inline"
        defaultOpenKeys={_openKeys}
        selectedKeys={_openKeys}
        style={{ width: 220 }}
        items={items as never}
        onClick={onClick}
      />
    </ThemeContent>
  );
};

export default SideMenu;
