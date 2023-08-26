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

浏览器打开 [http://localhost:3000](http://localhost:3000)

## 目录

```bash
├── .vscode                     # 该项目 vscode 配置
├── .next                       # 生产包
├── public                      # 资源文件，打包后可在跟目录直接访问
├── src                         # 源码目录
│   ├── apis                    # 第三方接口
│   ├── app                     # App Route 目录
│   │   ├── api                 # api 层
│   │   └── about               # about 目录
│   │       └── page.tsx        # 有 page.tsx 才有 /about 路由
│   │
│   ├── components              # 组件
│   ├── hooks                   # hook 方法
│   ├── routes                  # 菜单配置
│   ├── theme                   # 主题/样式
│   └── util                    # 工具库
│       └── index.ts            # 工具方法
├── .commitlintrc.js            # git commit 规范配置
├── .env                        # 环境变量
├── .eslintrc.json              # eslint 配置
├── .gitignore                  # git忽略文件
├── .prettierrc.cjs             # prettier 配置
├── Dockerfile                  # docker 部署
├── next.config.js              # nextjs 配置
├── package.json
├── README.md                   # 文档说明
└── tsconfig.json               # ts 配置

```

## 基本配置

#### favicon

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

#### mata

seo 优化

```tsx
// **/page.tsx

// either Static metadata
export const metadata = {
  title: 'About Page',
  description: 'this is 描述　',
};

// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: '...',
  };
}
```

## next.config.js

#### 允许某个域名的图片在项目里使用

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.xxx.com'],
  },
};

module.exports = nextConfig;
```

## 项目组织

Next.js 提供了多种功能，帮助您在遵循路由约定的同时组织项目。

#### 基本规则

在 Next.js app 中，`每个文件夹都代表一个路由段`，但只有对应的路由段中添加了 page.js 或 page.tsx 文件时，该路由才是`公开可访问`的。

例如，使用以下文件夹结构 /app/chatgpt/list.tsx 访问 localhost:3000/chatgpt 将导致 404 错误，直到定义了 page.tsx 文件。只有 page.tsx 返回的内容才会发送到客户端。在应用程序目录中，路由段内其他的文件不会被访问到。

#### 私有文件夹

Next.js 中还提供了私有文件夹功能，只需在文件夹名称前`加下划线`，就让它成为一个私有实现细节，不能通过路由访问。

## App Router

推荐使用

#### 添加 /about 路由

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

#### 嵌套路由

```bash
# 实现
/demo
/demo/fetch
/demo/from

# 具体代码看 app/demo
```

#### 动态路由

```bash
# 实现
/demo/fetch/books/1
/demo/fetch/books/2
/demo/fetch/books/3

# 具体代码看 app/demo/fetch/books/[Id]
```

还可以在动态路由里继续嵌套路由。

## Pages Router

主推 App Router，这部分了解请移步看官方文档

## Next Api 数据获取

目录 app/api，目录的终点都是 route.ts 结束的。

#### 本地接口 api/test

http://localhost:3000/api/test

```ts
// api/test/route.ts
import { NextResponse } from 'next/server';

export const GET = async (request: any) => {
  try {
    return new NextResponse(
      JSON.stringify({
        code: 2000,
        data: '这是本地接口。',
        msg: '我什么都不知道',
      }),
      { status: 200 },
    );
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
```

#### 转发第三方接口 api/book

http://localhost:3000/api/book

```ts
// api/book/route.ts
import { NextResponse } from 'next/server';

export const GET = async (request: any) => {
  try {
    const res = await fetch(`http://81.71.98.176:3000/book/list`);
    const data = await res.json();
    return new NextResponse(JSON.stringify(data), { status: 200 });
  } catch (err) {
    return new NextResponse('Database Error', { status: 500 });
  }
};
```

#### 使用 swr 处理请求

SWR 是一个用于数据获取和状态管理的 React Hooks 库, 只能在 client 组件里使用。

```tsx
// 示例 app/demo/fetch/books/SwrDemo.tsx
'use client';

import ContentLoader from 'react-content-loader';
import Link from 'next/link';
import useSWR from 'swr';
import { Card } from 'antd';
import styles from './page.module.css';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

function SwrDemo() {
  const { data, error, isLoading } = useSWR('/api/book', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) {
    return (
      <ContentLoader viewBox="0 0 900 100">
        <rect x="20" y="22" rx="0" ry="0" width="300" height="18" />
        <rect x="20" y="48" rx="0" ry="0" width="100" height="12" />
        <rect x="20" y="68" rx="0" ry="0" width="100" height="12" />
      </ContentLoader>
    );
  }

  return (
    <Card>
      <h6 className={styles.title}>【客户端渲染】swr 的简单应用 （可结合骨架屏提升用户体验）</h6>
      <ul className={styles.list}>
        {data?.data?.map((book: any, key: number) => {
          const _href = '/demo/fetch/books/' + String(book?.id);
          return (
            <li key={key}>
              <Link href={_href}>{book?.name}</Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default SwrDemo;
```

#### Github 授权登录

[next-auth.js](https://next-auth.js.org/getting-started/example)

- .env 环境变量

```bash
GITHUB_ID=db17d37c45b0132350b8
GITHUB_SECRET=16352633403f1650cdbdeb2ec4f1377f6a916332

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=123456
```

- app/app/auth/[...nextauth]/route.ts

```ts
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

const hander = NextAuth({
  // 在 providers 中配置更多授权服务
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
});

export { hander as GET, hander as POST };
```

- components/AuthProvider/AuthProvider.tsx 组件

```tsx
'use client';

import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

- app/layout.tsx 上使用 AuthProvider

```tsx
import React from 'react';
import StyledComponentsRegistry from '@/components/AntdRegistry';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import '@/theme/globals.scss';

export const metadata = {
  title: 'next-antd-pc',
  description: 'Generated by create next and antd app',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <AuthProvider>{children}</AuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

export default RootLayout;
```

- LoginBtn 登录组件
  components/user/LoginBtn

```tsx
'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { Button } from 'antd';

export default function Component() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'authenticated') {
    return (
      <>
        <span>{userEmail}</span>
        <Button type="link" onClick={() => signOut()}>
          退出
        </Button>
      </>
    );
  }

  return (
    <Button type="link" onClick={() => signIn('github')}>
      登录
    </Button>
  );
}
```

## antd 的使用

[在 Nextjs 中使用 Antd](https://ant.design/docs/react/use-with-next-cn)

```ts
// 注意：const cache = createCache(); 需要移到函数外，不然在引用 menu 组件，页面跳转的时候会报错【仅在打包后的生产环境可现】。
'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
const cache = createCache();

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};

export default StyledComponentsRegistry;
```

## 管理端的 form 表单设计

http://localhost:3000/demo/form/base

未完待续...

## 性能优化

### 骨架屏 - [react-content-loader](https://github.com/danilowoz/react-content-loader)

[在线编辑](https://skeletonreact.com/)

未完待续...

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

## 学习资料

- [Nextjs](https://nextjs.org/docs)

- [在 Nextjs 中使用 Antd](https://ant.design/docs/react/use-with-next-cn)

- [代码规范](https://juejin.cn/post/7194716721763057722)

- [用 vite 4 + react 18 + ts + react-router-dom v6 + zustand + antd 5 打造明星级前端项目](https://juejin.cn/post/7189536506334150717)
