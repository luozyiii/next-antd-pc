import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

interface themeContentProps {
  children?: React.ReactNode | null;
}

/* 注意：不要在 src/app/* 下使用, 构建的生产包莫名报错 */
const themeContent: React.FC<themeContentProps> = ({
  children,
}: themeContentProps) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default themeContent;
