"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  HomeOutlined,
  WifiOutlined,
  HeartOutlined,
  SmileOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import ThemeContent from "../page/theme-content";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: any["items"] = [
  {
    label: "首页　",
    key: "",
    icon: <HomeOutlined />,
  },
  {
    label: "示例",
    key: "demo",
    icon: <HeartOutlined />,
  },
  {
    label: "关于我们",
    key: "about",
    icon: <SmileOutlined />,
  },
  {
    label: "博客",
    key: "blog",
    icon: <FileTextOutlined />,
  },
  {
    label: "你点不了",
    key: "/SubMenu",
    icon: <WifiOutlined />,
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
