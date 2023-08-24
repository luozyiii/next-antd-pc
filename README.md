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
  title: 'About Page',
  description: 'this is 描述　',
};
```

## App Router

### 添加 /about 路由

在 app 文件夹上创建 about 文件夹，创建 page.tsx。

```tsx
// src/app/about/page.tsx

import React from 'react';
import { Button, ConfigProvider } from 'antd';
import theme from '@/theme/themeConfig';

export const metadata = {
  title: 'About Page',
  description: 'this is 描述　',
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

## MetaData

- react-helmet
- next-seo

## 部署

- 项目根目录添加 Dockerfile 文件

```Dockerfile
# 使用Node.js作为基础镜像
FROM node:20-alpine3.18

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json文件到工作目录
COPY package*.json ./

# npm 源，选用国内镜像源以提高下载速度
# RUN npm config set registry https://registry.npm.taobao.org/

# 腾讯源
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/

# 安装依赖
RUN npm install

# 复制应用程序的源代码到工作目录
COPY . .

# 构建应用程序
RUN npm run build

# 暴露应用程序的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "run", "start"]

```

- 再执行以下指令

```bash
# 2、导航到您的NextJS应用程序的根目录，并运行以下命令来构建Docker镜像：
docker build -t next-antd-pc .

# 3、使用以下命令在Docker容器中运行您的NextJS应用程序：
docker run --name next-antd-pc -d -p 8808:3000 next-antd-pc

# docker run: 运行一个新的容器。
# -- name: 容器名称。
# -d: 在后台运行容器。
# -p 8808:3000: 将容器的端口3000映射到主机的端口8808，这样可以通过主机的端口访问容器中运行的应用程序。
# next-antd-pc: 要运行的容器的名称或镜像。
```

## 骨架屏 - [react-content-loader](https://github.com/danilowoz/react-content-loader)

[在线编辑](https://skeletonreact.com/)

## 学习资料

- [Nextjs](https://nextjs.org/docs)

- [在 Nextjs 中使用 Antd](https://ant.design/docs/react/use-with-next-cn)

- [代码规范](https://juejin.cn/post/7194716721763057722)
