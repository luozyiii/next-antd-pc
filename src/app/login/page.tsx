import React from "react";
import { Button, ConfigProvider } from "antd";
import Login from "@/views/login";

export const metadata = {
  title: "Login Page",
  description: "这是一个登录页面",
};

const LoginPage = () => <Login />;

export default LoginPage;
