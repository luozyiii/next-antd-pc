"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "antd";
import TopMenu from "../menu/top-menu";
import SideMenu from "../menu/side-menu";
import styles from "./styles.module.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const currentPath = usePathname();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftArea}>Logo</div>
        <div className={styles.contentArea}>
          <TopMenu />
        </div>
        <div className={styles.rightArea}>
          admin
          <Button type="link">
            <Link href="/login" className={styles.logout}>
              退出
            </Link>
          </Button>
        </div>
      </header>
      <div className={styles.main}>
        {currentPath !== "/" && (
          <div className={styles.leftArea}>
            <SideMenu />
          </div>
        )}
        <div className={styles.contentArea}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
