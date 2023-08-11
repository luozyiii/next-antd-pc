"use client";

import { useRouter } from "next/navigation";
import { LeftOutlined } from "@ant-design/icons";
import { Layout, ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

import styles from "./styles.module.scss";
const { Content } = Layout;

interface PageContentProps {
  title?: string;
  back?: boolean; // 返回上一页
  children?: React.ReactNode | null;
  rightArea?: React.ReactNode | null;
}

const PageContent: React.FC<PageContentProps> = ({
  title = "首页",
  back = false,
  children,
  rightArea,
}: PageContentProps) => {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <ConfigProvider theme={theme}>
      <Content className={styles.pageContent}>
        <div className={styles.headerBox}>
          <div className={styles.title}>
            {back && <LeftOutlined className={styles.back} onClick={goBack} />}
            {title}
          </div>
          {rightArea && <div className={styles.rightBox}>{rightArea}</div>}
        </div>
        <div className={styles.contentBox}>{children}</div>
      </Content>
    </ConfigProvider>
  );
};

export default PageContent;
