import { Button, ConfigProvider } from "antd";
import Link from "next/link";
import theme from "@/theme/themeConfig";
import styles from "./page.module.scss";

export const metadata = {
  title: "迷路了～",
  description: "迷路的小羔羊　",
};

// 在这个页面使用 antd 组件会出现闪烁
export default function NotFound() {
  return (
    <ConfigProvider theme={theme}>
      <div className={styles.notFoundPage}>
        <h1>404 - Page Not Found</h1>
        <p>Sorry, there is nothing to see here</p>
        <Link className={styles.goHome} href="/">
          Go Home
        </Link>
      </div>
    </ConfigProvider>
  );
}
