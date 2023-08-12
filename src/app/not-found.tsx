import { Button, ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";
import styles from "./page.module.scss";
import Link from "next/link";

export const metadata = {
  title: "迷路了～",
  description: "迷路的小羔羊",
};

// 在这个页面使用 antd 组件会出现闪烁
export default function NotFound() {
  return (
    <ConfigProvider theme={theme}>
      <div className={styles.notFoundPage}>
        <h1>404 - 迷路的小羔羊</h1>
        <p>您好, 这里什么都没有。</p>
        <Link className={styles.goHome} href="/">
          返回首页
        </Link>
      </div>
    </ConfigProvider>
  );
}
