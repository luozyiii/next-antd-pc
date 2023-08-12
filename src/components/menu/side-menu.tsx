"use client";

import React, { useState } from "react";
import { FormOutlined } from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import ThemeContent from "../page/theme-content";
import type { MenuProps } from "antd";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("表单", "form", <FormOutlined />, [
    getItem("基础", "base"),
    getItem("选择器", "select"),
    getItem("日期时间", "datetime"),
    getItem("表单联动", "linkage"),
    getItem("上传", "upload"),
    getItem("自定义表单", "custom"),
    getItem("筛选表单", "filter"),
    getItem("弹窗表单", "modal"),
  ]),
];

const rootSubmenuKeys = ["form"];

const SideMenu: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openKeys, setOpenKeys] = useState(["form"]);
  const pathnameArr = pathname?.split("/");
  const _selectPath = pathnameArr[pathnameArr.length - 1];

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
