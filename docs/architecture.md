# 项目架构

本文档详细介绍了 Next.js + Antd PC 管理后台的整体架构设计。

## 🏗️ 整体架构

### 技术架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        用户界面层                              │
├─────────────────────────────────────────────────────────────┤
│  Next.js App Router  │  Ant Design UI  │  CSS Modules      │
├─────────────────────────────────────────────────────────────┤
│                        业务逻辑层                              │
├─────────────────────────────────────────────────────────────┤
│  React Components    │  Custom Hooks   │  Context API      │
├─────────────────────────────────────────────────────────────┤
│                        数据访问层                              │
├─────────────────────────────────────────────────────────────┤
│  SWR Data Fetching   │  API Routes     │  Mock Data        │
├─────────────────────────────────────────────────────────────┤
│                        基础设施层                              │
├─────────────────────────────────────────────────────────────┤
│  TypeScript          │  ESLint         │  Prettier         │
└─────────────────────────────────────────────────────────────┘
```

## 📁 目录结构

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # 认证相关路由组
│   │   ├── login/               # 登录页面
│   │   └── register/            # 注册页面
│   ├── demo/                    # 演示页面
│   │   ├── fetch/               # 数据获取演示
│   │   ├── form/                # 表单演示
│   │   └── layout/              # 布局演示
│   ├── api/                     # API 路由
│   │   ├── auth/                # 认证 API
│   │   ├── book/                # 书籍 API
│   │   └── test/                # 测试 API
│   ├── globals.css              # 全局样式
│   ├── layout.tsx               # 根布局
│   └── page.tsx                 # 首页
├── components/                   # 可复用组件
│   ├── form/                    # 表单组件系统
│   │   ├── form.tsx             # 主表单组件
│   │   ├── filter-form/         # 筛选表单
│   │   ├── modal-form/          # 弹窗表单
│   │   └── item/                # 表单项组件
│   │       └── base/            # 基础表单项
│   ├── layout/                  # 布局组件
│   │   ├── page-content/        # 页面内容容器
│   │   └── theme-content/       # 主题内容容器
│   ├── menu/                    # 菜单组件
│   │   ├── side-menu.tsx        # 侧边菜单
│   │   └── top-menu.tsx         # 顶部菜单
│   ├── user/                    # 用户相关组件
│   └── index.ts                 # 组件导出
├── hooks/                       # 自定义 Hooks
│   └── useLocalStorage.ts       # 本地存储 Hook
├── routes/                      # 路由配置
│   └── index.ts                 # 菜单路由配置
├── theme/                       # 主题配置
│   ├── globals.scss             # 全局样式
│   └── themeConfig.ts           # Antd 主题配置
├── types/                       # TypeScript 类型定义
│   └── index.ts                 # 全局类型
└── utils/                       # 工具函数
    └── index.ts                 # 工具方法
```

## 🔧 核心架构组件

### 1. Next.js App Router

采用 Next.js 14 的 App Router 架构：

- **文件系统路由**: 基于文件夹结构自动生成路由
- **布局系统**: 支持嵌套布局和共享 UI
- **服务端组件**: 默认服务端渲染，提升性能
- **客户端组件**: 按需使用 'use client' 指令

### 2. 组件化架构

#### 组件分层

```
高阶组件 (HOC)
    ↓
页面组件 (Pages)
    ↓
容器组件 (Containers)
    ↓
业务组件 (Business)
    ↓
基础组件 (Base)
```

#### 组件设计原则

- **单一职责**: 每个组件只负责一个功能
- **可复用性**: 组件设计考虑复用场景
- **可组合性**: 组件可以灵活组合使用
- **类型安全**: 完整的 TypeScript 类型定义

### 3. 状态管理

采用 React 内置状态管理方案：

- **useState**: 组件内部状态
- **useContext**: 跨组件状态共享
- **useReducer**: 复杂状态逻辑
- **自定义 Hooks**: 状态逻辑复用

### 4. 数据获取

使用 SWR 进行数据获取：

```typescript
// 数据获取模式
const { data, error, isLoading } = useSWR('/api/endpoint', fetcher);
```

特性：
- **缓存机制**: 自动缓存和重用数据
- **重新验证**: 自动重新获取数据
- **错误处理**: 统一的错误处理机制
- **加载状态**: 内置加载状态管理

## 🎨 UI 架构

### 设计系统

基于 Ant Design 构建统一的设计系统：

- **主题配置**: 统一的颜色、字体、间距规范
- **组件库**: 基于 Antd 的业务组件封装
- **样式方案**: CSS Modules + SCSS
- **响应式**: 移动端适配

### 表单系统架构

```
Form (主表单组件)
├── FormItem (表单项容器)
│   ├── Input (输入框)
│   ├── Select (选择器)
│   ├── DatePicker (日期选择)
│   ├── Upload (文件上传)
│   └── ... (其他表单控件)
├── FilterForm (筛选表单)
└── ModalForm (弹窗表单)
```

## 🔒 类型安全

### TypeScript 配置

- **严格模式**: 启用所有严格类型检查
- **路径映射**: 配置 @ 别名简化导入
- **类型定义**: 完整的组件和 API 类型定义

### 类型系统设计

```typescript
// 全局类型定义
interface BaseResponse<T = any> {
  code: number;
  data: T;
  message: string;
}

// 组件 Props 类型
interface FormItemProps {
  type: FormItemType;
  label: string;
  name: string;
  rules?: ValidationRule[];
  cProps?: Record<string, unknown>;
}
```

## 🛠️ 开发工具链

### 代码质量

- **ESLint**: 代码规范检查
- **Prettier**: 代码格式化
- **TypeScript**: 类型检查
- **Husky**: Git hooks

### 构建工具

- **Next.js**: 内置构建和优化
- **SWC**: 快速编译器
- **CSS Modules**: 样式模块化
- **自动优化**: 图片、字体、代码分割

## 🚀 性能优化

### 渲染优化

- **服务端渲染**: 首屏快速加载
- **静态生成**: 预构建静态页面
- **代码分割**: 按需加载组件
- **图片优化**: Next.js Image 组件

### 缓存策略

- **SWR 缓存**: 数据层缓存
- **浏览器缓存**: 静态资源缓存
- **CDN 缓存**: 全球内容分发

## 📱 响应式设计

### 断点系统

```scss
// 响应式断点
$breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1600px
);
```

### 适配策略

- **移动优先**: 从小屏幕开始设计
- **弹性布局**: 使用 Flexbox 和 Grid
- **相对单位**: 使用 rem、em、%
- **媒体查询**: 响应式样式调整

## 🔧 扩展性设计

### 插件化架构

- **组件插件**: 可插拔的业务组件
- **主题插件**: 可切换的主题系统
- **功能插件**: 可选的功能模块

### 配置化

- **路由配置**: 动态路由生成
- **菜单配置**: 可配置的导航菜单
- **表单配置**: 声明式表单构建
- **权限配置**: 基于角色的权限控制

这种架构设计确保了项目的可维护性、可扩展性和高性能，为企业级应用提供了坚实的技术基础。
