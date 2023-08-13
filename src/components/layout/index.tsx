"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "antd";
import { getSideMenu, topMenuConfig } from "@/routes";
import TopMenu from "../menu/top-menu";
import SideMenu from "../menu/side-menu";
import styles from "./styles.module.scss";
import LogoImg from "@/app/favicon.ico";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const pathnameArr = pathname?.split("/");
  const router = useRouter();

  const items = getSideMenu(pathnameArr[1]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftArea}>
          <Image
            src={LogoImg}
            alt="logo"
            className={styles.logo}
            onClick={() => router.push("/")}
          />
        </div>
        <div className={styles.contentArea}>
          <TopMenu items={topMenuConfig} />
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
        {items?.length > 0 && (
          <div className={styles.leftArea}>
            <SideMenu items={items} />
          </div>
        )}
        <div className={styles.contentArea}>{children}</div>
      </div>
    </>
  );
};

export default Layout;
