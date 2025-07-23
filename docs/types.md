# TypeScript 类型系统

本文档详细介绍了项目中的 TypeScript 类型定义和类型安全实践。

## 🎯 类型系统概览

### 类型架构

```
全局类型 (Global Types)
├── 基础类型 (Base Types)
├── API 类型 (API Types)
├── 组件类型 (Component Types)
├── 表单类型 (Form Types)
├── 路由类型 (Route Types)
└── 工具类型 (Utility Types)
```

### 类型文件结构

```
src/types/
├── index.ts              # 全局类型导出
├── api.ts               # API 相关类型
├── components.ts        # 组件相关类型
├── form.ts             # 表单相关类型
├── user.ts             # 用户相关类型
├── common.ts           # 通用类型
└── utils.ts            # 工具类型
```

## 🔧 基础类型定义

### 通用类型

```typescript
// src/types/common.ts

// 基础响应类型
export interface BaseResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
  success: boolean;
  timestamp: number;
}

// 分页类型
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// 分页响应类型
export interface PaginatedResponse<T> extends BaseResponse<{
  items: T[];
  pagination: Pagination;
}> {}

// 选项类型
export interface Option<T = string | number> {
  label: string;
  value: T;
  disabled?: boolean;
  children?: Option<T>[];
}

// 树形数据类型
export interface TreeNode<T = unknown> {
  id: string | number;
  title: string;
  key: string;
  children?: TreeNode<T>[];
  data?: T;
}

// 文件类型
export interface FileInfo {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploadTime: Date;
}

// 状态枚举
export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DELETED = 'deleted'
}

// 用户角色枚举
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}
```

### 用户类型

```typescript
// src/types/user.ts
import { UserRole, Status } from './common';

// 用户基础信息
export interface UserInfo {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

// 用户创建请求
export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  phone?: string;
}

// 用户更新请求
export interface UpdateUserRequest {
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  status?: Status;
}

// 用户登录请求
export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

// 用户登录响应
export interface LoginResponse {
  user: UserInfo;
  token: string;
  refreshToken: string;
  expiresIn: number;
}

// 用户权限
export interface UserPermission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

// 用户会话
export interface UserSession {
  user: UserInfo;
  permissions: UserPermission[];
  isAuthenticated: boolean;
}
```

## 📋 表单类型系统

### 表单字段类型

```typescript
// src/types/form.ts
import { Rule } from 'antd/es/form';
import { ReactNode } from 'react';

// 表单字段类型枚举
export type FormItemType = 
  | 'input'
  | 'password'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'datepicker'
  | 'daterangepicker'
  | 'timepicker'
  | 'timerangepicker'
  | 'upload'
  | 'cascader'
  | 'treeselect'
  | 'priceUnit';

// 表单字段配置
export interface FormItemProps {
  type: FormItemType;
  label: string;
  name: string;
  required?: boolean;
  rules?: Rule[];
  tooltip?: string;
  placeholder?: string;
  disabled?: boolean;
  hidden?: boolean;
  span?: number;
  offset?: number;
  cProps?: Record<string, unknown>;
  shouldUpdate?: boolean | ((prevValues: any, currentValues: any) => boolean);
  displayRules?: Array<{
    name: string;
    value: unknown;
  }>;
}

// 表单配置
export interface FormConfig {
  fields: FormItemProps[];
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: {
    span?: number;
    offset?: number;
  };
  wrapperCol?: {
    span?: number;
    offset?: number;
  };
  initialValues?: Record<string, unknown>;
  onFinish?: (values: Record<string, unknown>) => void;
  onFinishFailed?: (errorInfo: any) => void;
}

// 表单验证规则
export interface ValidationRule extends Rule {
  field?: string;
  fullField?: string;
  type?: string;
}

// 表单错误信息
export interface FormError {
  field: string;
  message: string;
  value?: unknown;
}

// 表单状态
export interface FormState {
  values: Record<string, unknown>;
  errors: FormError[];
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValid: boolean;
}
```

### 特定表单类型

```typescript
// 用户表单
export interface UserFormData {
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: Status;
  avatar?: FileInfo;
}

// 搜索表单
export interface SearchFormData {
  keyword?: string;
  category?: string;
  status?: Status;
  dateRange?: [Date, Date];
}

// 登录表单
export interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}
```

## 🧩 组件类型系统

### 基础组件类型

```typescript
// src/types/components.ts
import { ReactNode, CSSProperties } from 'react';

// 基础组件 Props
export interface BaseComponentProps {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  testId?: string;
}

// 按钮组件类型
export interface ButtonProps extends BaseComponentProps {
  type?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  htmlType?: 'button' | 'submit' | 'reset';
}

// 输入框组件类型
export interface InputProps extends BaseComponentProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;
  maxLength?: number;
  showCount?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  onChange?: (value: string) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

// 选择器组件类型
export interface SelectProps<T = unknown> extends BaseComponentProps {
  value?: T;
  defaultValue?: T;
  options: Option<T>[];
  placeholder?: string;
  disabled?: boolean;
  loading?: boolean;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  onChange?: (value: T) => void;
  onSearch?: (keyword: string) => void;
}

// 表格组件类型
export interface TableColumn<T = unknown> {
  key: string;
  title: string;
  dataIndex?: keyof T;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  render?: (value: unknown, record: T, index: number) => ReactNode;
}

export interface TableProps<T = unknown> extends BaseComponentProps {
  columns: TableColumn<T>[];
  dataSource: T[];
  loading?: boolean;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    onChange?: (page: number, pageSize: number) => void;
  };
  rowKey?: keyof T | ((record: T) => string);
  rowSelection?: {
    selectedRowKeys: string[];
    onChange: (selectedRowKeys: string[], selectedRows: T[]) => void;
  };
  onRow?: (record: T, index: number) => Record<string, unknown>;
}
```

### 布局组件类型

```typescript
// 页面容器类型
export interface PageContentProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  back?: boolean;
  extra?: ReactNode;
  breadcrumb?: Array<{
    title: string;
    href?: string;
  }>;
  loading?: boolean;
}

// 侧边栏类型
export interface SidebarProps extends BaseComponentProps {
  collapsed?: boolean;
  width?: number;
  theme?: 'light' | 'dark';
  onCollapse?: (collapsed: boolean) => void;
}

// 头部类型
export interface HeaderProps extends BaseComponentProps {
  title?: string;
  logo?: ReactNode;
  actions?: ReactNode;
  user?: UserInfo;
  onUserMenuClick?: (key: string) => void;
}
```

## 🌐 API 类型系统

### 请求类型

```typescript
// src/types/api.ts

// HTTP 方法
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// 请求配置
export interface RequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, unknown>;
  data?: unknown;
  timeout?: number;
  withCredentials?: boolean;
}

// 请求拦截器
export interface RequestInterceptor {
  onFulfilled?: (config: RequestConfig) => RequestConfig | Promise<RequestConfig>;
  onRejected?: (error: unknown) => unknown;
}

// 响应拦截器
export interface ResponseInterceptor<T = unknown> {
  onFulfilled?: (response: BaseResponse<T>) => BaseResponse<T> | Promise<BaseResponse<T>>;
  onRejected?: (error: unknown) => unknown;
}

// API 客户端配置
export interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  requestInterceptors?: RequestInterceptor[];
  responseInterceptors?: ResponseInterceptor[];
}
```

### 业务 API 类型

```typescript
// 用户 API
export interface UserApi {
  getUsers: (params: {
    page?: number;
    limit?: number;
    search?: string;
    role?: UserRole;
  }) => Promise<PaginatedResponse<UserInfo>>;
  
  getUser: (id: number) => Promise<BaseResponse<UserInfo>>;
  
  createUser: (data: CreateUserRequest) => Promise<BaseResponse<UserInfo>>;
  
  updateUser: (id: number, data: UpdateUserRequest) => Promise<BaseResponse<UserInfo>>;
  
  deleteUser: (id: number) => Promise<BaseResponse<null>>;
  
  login: (data: LoginRequest) => Promise<BaseResponse<LoginResponse>>;
  
  logout: () => Promise<BaseResponse<null>>;
}

// 文件上传 API
export interface UploadApi {
  uploadFile: (file: File, options?: {
    onProgress?: (percent: number) => void;
  }) => Promise<BaseResponse<FileInfo>>;
  
  deleteFile: (id: string) => Promise<BaseResponse<null>>;
}
```

## 🛠️ 工具类型

### 通用工具类型

```typescript
// src/types/utils.ts

// 深度可选
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 深度必需
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// 排除空值
export type NonNullable<T> = T extends null | undefined ? never : T;

// 提取函数参数类型
export type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never;

// 提取函数返回类型
export type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any;

// 提取 Promise 类型
export type Awaited<T> = T extends Promise<infer U> ? U : T;

// 键值对类型
export type KeyValuePair<K extends string | number | symbol = string, V = unknown> = {
  [key in K]: V;
};

// 条件类型
export type If<C extends boolean, T, F> = C extends true ? T : F;

// 联合类型转交叉类型
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
```

### 表单工具类型

```typescript
// 表单值类型提取
export type FormValues<T extends FormItemProps[]> = {
  [K in T[number]['name']]: unknown;
};

// 表单验证结果
export type ValidationResult<T> = {
  [K in keyof T]: {
    isValid: boolean;
    errors: string[];
  };
};

// 表单字段状态
export type FieldState = {
  value: unknown;
  error?: string;
  touched: boolean;
  dirty: boolean;
};

// 表单状态管理
export type FormStateManager<T> = {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  isValid: boolean;
  setValue: <K extends keyof T>(field: K, value: T[K]) => void;
  setError: <K extends keyof T>(field: K, error: string) => void;
  setTouched: <K extends keyof T>(field: K, touched: boolean) => void;
  reset: () => void;
  submit: () => Promise<void>;
};
```

## 🎨 主题类型

```typescript
// src/types/theme.ts

// 颜色类型
export interface ColorPalette {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  background: {
    default: string;
    paper: string;
    disabled: string;
  };
  border: {
    default: string;
    light: string;
    dark: string;
  };
}

// 间距类型
export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

// 字体类型
export interface Typography {
  fontFamily: string;
  fontSize: {
    xs: number;
    sm: number;
    base: number;
    lg: number;
    xl: number;
    xxl: number;
  };
  fontWeight: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
}

// 主题配置
export interface ThemeConfig {
  colors: ColorPalette;
  spacing: Spacing;
  typography: Typography;
  borderRadius: {
    sm: number;
    base: number;
    lg: number;
    full: number;
  };
  shadows: {
    sm: string;
    base: string;
    lg: string;
    xl: string;
  };
  breakpoints: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };
}
```

## 📝 类型使用最佳实践

### 1. 类型导入和导出

```typescript
// ✅ 推荐：使用 type 关键字导入类型
import type { UserInfo, CreateUserRequest } from '@/types/user';
import type { FormItemProps } from '@/types/form';

// ✅ 推荐：统一导出类型
export type { UserInfo, CreateUserRequest } from './user';
export type { FormItemProps, FormConfig } from './form';
```

### 2. 泛型使用

```typescript
// ✅ 推荐：使用泛型提高类型复用性
interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  success: boolean;
}

// 使用时指定具体类型
const userResponse: ApiResponse<UserInfo> = await api.getUser(1);
const usersResponse: ApiResponse<UserInfo[]> = await api.getUsers();
```

### 3. 类型守卫

```typescript
// ✅ 推荐：使用类型守卫确保类型安全
function isUserInfo(obj: unknown): obj is UserInfo {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
}

// 使用类型守卫
if (isUserInfo(data)) {
  // 这里 data 的类型是 UserInfo
  console.log(data.name);
}
```

### 4. 条件类型

```typescript
// ✅ 推荐：使用条件类型处理复杂逻辑
type ApiResult<T, E = string> = T extends string 
  ? { success: true; data: T } 
  : { success: false; error: E };

// 使用条件类型
type SuccessResult = ApiResult<UserInfo>; // { success: true; data: UserInfo }
type ErrorResult = ApiResult<never, string>; // { success: false; error: string }
```

通过这套完整的类型系统，可以确保项目具备强大的类型安全性和良好的开发体验。
