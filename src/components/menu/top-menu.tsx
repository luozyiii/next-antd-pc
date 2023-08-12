"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import ThemeContent from "../page/theme-content";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const items: MenuProps["items"] = [
  {
    label: "Home",
    key: "",
    icon: <MailOutlined />,
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
    label: "Navigation Three - Submenu",
    key: "SubMenu",
    icon: <SettingOutlined />,
    disabled: true,
  },
  {
    label: "Not Found",
    key: "alipay",
  },
];

const TopMenu = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const _path = currentPath.split("/")[1] || "";
  const [current, setCurrent] = useState(_path);

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "") {
      router.push("/");
    } else {
      router.push(`/${e.key}`);
    }
  };
  return (
    <ThemeContent>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </ThemeContent>
  );
};

export default TopMenu;
