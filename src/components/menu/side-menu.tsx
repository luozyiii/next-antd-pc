"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import ThemeContent from "../page/theme-content";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const rootSubmenuKeys = ["form"];

interface SideMenuProps {
  items: any[];
}

const SideMenu: React.FC<SideMenuProps> = ({ items }) => {
  const router = useRouter();
  const pathname = usePathname();
  const pathnameArr = pathname?.split("/");
  const _selectPath = pathnameArr[pathnameArr.length - 1];
  const [openKeys, setOpenKeys] = useState([pathnameArr[2]]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onClick: MenuProps["onClick"] = (e) => {
    const _keyPath = "/demo/" + e.keyPath.reverse().join("/");
    router.push(_keyPath);
  };

  return (
    <ThemeContent>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[_selectPath]}
        style={{ width: 220 }}
        items={items}
        onClick={onClick}
      />
    </ThemeContent>
  );
};

export default SideMenu;
