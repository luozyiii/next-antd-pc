import { ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

interface themeContentProps {
  children?: React.ReactNode | null;
}

const themeContent: React.FC<themeContentProps> = ({
  children,
}: themeContentProps) => {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
};

export default themeContent;
