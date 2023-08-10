# next-antd-pc

这是一个 [Next.js](https://nextjs.org/) 如何结合 [antd](https://ant.design/docs/react/use-with-next-cn#%E4%BD%BF%E7%94%A8-nextjs-%E7%9A%84-app-router) 项目，探索一种管理后台系统的新开发模式。

## 使用

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 配置

### favicon

```tsx
// app/layout.tsx
<html lang="en">
  {/* add this */}
  <head>
    <link rel="icon" href="/favicon.ico" />
  </head>

  <body>{children}</body>
</html>
```

### mata

```tsx
// **/page.tsx

export const metadata = {
  title: "About Page",
  description: "this is 描述　",
};
```

## App Router

### 添加 /about 路由

在 app 文件夹上创建 about 文件夹，创建 page.tsx。

```tsx
// src/app/about/page.tsx

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
```

### 嵌套路由

```bash
# 实现
/blog
/blog/first
/blog/second

# 具体代码看 app/blog
```

### 动态路由

```bash
# 实现
/blog/1
/blog/2
/blog/3

# 具体代码看 app/blog/[blogId]
```

还可以在动态路由里继续嵌套路由。

## Pages Router

## 项目组织

Next.js 提供了多种功能，帮助您在遵循路由约定的同时组织项目。

### 文件共置

在 Next.js app 中，每个文件夹都代表一个路由段，但只有对应的路由段中添加了 page.js 或 page.tsx 文件时，该路由才是公开可访问的。

例如，使用以下文件夹结构 /app/chatgpt/list.tsx 访问 localhost:3000/chatgpt 将导致 404 错误，直到定义了 page.tsx 文件。只有 page.tsx 返回的内容才会发送到客户端。在应用程序目录中，路由段内共置的文件不会被访问到。

### 私有文件夹

Next.js 中还提供了私有文件夹功能，只需在文件夹名称前加下划线，就让它成为一个私有实现细节，不能通过路由访问。

例如，尝试访问 localhost:3000/\_hello 路径查看 /app/\_hello 文件夹下 page.tsx 文件的内容是无效的，会导致 404 错误。私有文件夹对于分离 UI 逻辑和路由逻辑、组织内部文件、在代码编辑器中排序和分组文件以及避免命名冲突非常有用。

## 学习资料

- [Nextjs](https://nextjs.org/docs)

- [在 Nextjs 中使用 Antd](https://ant.design/docs/react/use-with-next-cn)

- [leran nextjs](https://www.slingacademy.com/article/how-to-highlight-currently-active-link-in-next-js/)
