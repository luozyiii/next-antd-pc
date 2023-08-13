"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getAllPath } from "@/routes/utils";
import ThemeContent from "../page/theme-content";
import type { MenuProps } from "antd";
import { Menu } from "antd";

interface SideMenuProps {
  items: any[];
}

const SideMenu: React.FC<SideMenuProps> = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const _openKeys = getAllPath(pathname);

  const onClick: MenuProps["onClick"] = (e) => {
    router.push(e.key);
  };

  return (
    <ThemeContent>
      <Menu
        mode="inline"
        defaultOpenKeys={_openKeys}
        selectedKeys={_openKeys}
        style={{ width: 220 }}
        items={items}
        onClick={onClick}
      />
    </ThemeContent>
  );
};

export default SideMenu;
