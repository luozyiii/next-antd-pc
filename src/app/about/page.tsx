import React from "react";
import { Button, ConfigProvider } from "antd";
import theme from "@/theme/themeConfig";

export const metadata = {
  title: "About Page",
  description: "this is 描述　",
};

const AboutPage = () => (
  <ConfigProvider theme={theme}>
    <Button type="primary">About　</Button>
  </ConfigProvider>
);

export default AboutPage;
