"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AppstoreOutlined,
  HomeOutlined,
  SettingOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import ThemeContent from "../page/theme-content";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: any["items"] = [
  {
    label: "Home",
    key: "",
    icon: <HomeOutlined />,
  },
  {
    label: "示例",
    key: "demo",
    icon: <HeartOutlined />,
  },
  {
    label: "About",
    key: "about",
    icon: <AppstoreOutlined />,
  },
  {
    label: "Blog",
    key: "blog",
    icon: <AppstoreOutlined />,
  },
  {
    label: "你点不了",
    key: "/SubMenu",
    icon: <SettingOutlined />,
    disabled: true,
  },
  {
    label: "点了会迷路",
    key: "notfound",
  },
];

const TopMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const _selectedKeys = pathname?.split("/")[1];

  const onClick: MenuProps["onClick"] = (e) => {
    if (e.key === "demo") {
      router.push("/demo/form/base");
    } else {
      const _path = "/" + e.key;
      router.push(_path);
    }
  };
  return (
    <ThemeContent>
      <Menu
        onClick={onClick}
        selectedKeys={[_selectedKeys]}
        mode="horizontal"
        items={items}
      />
    </ThemeContent>
  );
};

export default TopMenu;
