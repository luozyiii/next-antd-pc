// 通用类型定义

// API 响应类型
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  msg: string;
  success?: boolean;
}

// 分页相关类型
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResponse<T = unknown> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 表单相关类型
export interface FormFieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FormValidationRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  min?: number;
  max?: number;
  validator?: (rule: unknown, value: unknown) => Promise<void>;
}

// 表单显示规则类型
export interface FormDisplayRule {
  field: string;
  value: unknown;
  operator?: 'eq' | 'ne' | 'in' | 'nin';
}

// 表单字段更新条件 - 兼容 Antd 的 ShouldUpdate 类型
export type FormShouldUpdate = boolean | string[] | ((prevValues: RecordType, currentValues: RecordType) => boolean);

// 菜单相关类型
export interface MenuConfig {
  label: string;
  key: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuConfig[];
  redirect?: string;
  isMenu?: boolean;
  [key: string]: unknown;
}

export interface TreeItem {
  isMenu?: boolean;
  key: string;
  label?: string;
  children?: TreeItem[];
  par?: string[];
  path?: string;
  [key: string]: unknown;
}

// 用户相关类型
export interface UserInfo {
  id?: string | number;
  username: string;
  email?: string;
  avatar?: string;
  role?: string;
  [key: string]: unknown;
}

export interface LoginCredentials extends RecordType {
  username: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  email?: string;
  confirmPassword?: string;
}

// HTTP 请求相关类型
export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: string | FormData;
  credentials?: RequestCredentials;
}

export interface UseFetchParams {
  url: string;
  method?: 'get' | 'post' | 'put' | 'head' | 'options' | 'delete';
  params?: Record<string, unknown>;
  options?: FetchOptions;
  token?: string;
}

export interface UseFetchResult<T = unknown> {
  raw: ApiResponse<T>;
  data: T | null;
  error: Error | null;
  loading: boolean;
  msg?: string;
}

// 表格相关类型
export interface TableColumn {
  key: string;
  title: string;
  dataIndex?: string;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right' | boolean;
  sorter?: boolean | ((a: unknown, b: unknown) => number);
  render?: (text: unknown, record: unknown, index: number) => React.ReactNode;
  [key: string]: unknown;
}

export interface UseTableParams<T = unknown> {
  fetch: (params: PaginationParams & Record<string, unknown>) => Promise<PaginatedResponse<T>>;
  fetchParams?: Record<string, unknown>;
}

// 文件上传相关类型
export interface UploadFile {
  uid: string;
  name: string;
  status: 'uploading' | 'done' | 'error' | 'removed';
  url?: string;
  thumbUrl?: string;
  size?: number;
  type?: string;
}

export interface UploadResponse {
  url: string;
  fileName: string;
  bucketName: string;
}

// 通用工具类型
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type RecordType = Record<string, unknown>;
export type AnyFunction = (...args: unknown[]) => unknown;
export type VoidFunction = () => void;

// 组件 Props 类型
export interface BaseComponentProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 路由相关类型
export interface RouteMatch {
  isExact: boolean;
  params: Record<string, string>;
  path: string;
  url: string;
}
