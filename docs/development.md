# 开发指南

本文档提供了项目开发的规范、最佳实践和工作流程。

## 🚀 开发环境搭建

### 环境要求

- **Node.js**: 18.17.0 或更高版本
- **npm**: 9.0.0 或更高版本
- **Git**: 2.30.0 或更高版本

### 安装步骤

```bash
# 1. 克隆项目
git clone <repository-url>
cd next-antd-pc

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 打开浏览器访问
# http://localhost:3000
```

### 开发工具配置

#### VS Code 推荐插件

```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss"
  ]
}
```

#### VS Code 设置

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative"
}
```

## 📝 代码规范

### TypeScript 规范

#### 1. 类型定义

```typescript
// ✅ 好的做法
interface UserInfo {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: Date;
}

// ❌ 避免使用 any
const userData: any = {};

// ✅ 使用具体类型
const userData: UserInfo = {
  id: 1,
  name: 'John',
  email: 'john@example.com',
  role: 'user',
  createdAt: new Date()
};
```

#### 2. 组件类型

```typescript
// ✅ 组件 Props 类型定义
interface ButtonProps {
  type?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  onClick,
  children
}) => {
  // 组件实现
};
```

#### 3. API 类型

```typescript
// API 响应类型
interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
  success: boolean;
}

// 具体业务类型
interface UserListResponse extends ApiResponse<UserInfo[]> {}
interface UserDetailResponse extends ApiResponse<UserInfo> {}
```

### React 规范

#### 1. 组件结构

```tsx
// ✅ 推荐的组件结构
import React, { useState, useEffect, useCallback } from 'react';
import { Button, Input } from 'antd';
import { UserService } from '@/services';
import styles from './index.module.scss';

interface UserFormProps {
  userId?: number;
  onSubmit: (data: UserInfo) => void;
}

const UserForm: React.FC<UserFormProps> = ({ userId, onSubmit }) => {
  // 1. 状态定义
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<UserInfo>>({});

  // 2. 副作用
  useEffect(() => {
    if (userId) {
      loadUserData(userId);
    }
  }, [userId]);

  // 3. 事件处理
  const loadUserData = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const response = await UserService.getUser(id);
      setFormData(response.data);
    } catch (error) {
      console.error('加载用户数据失败:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSubmit = useCallback(() => {
    onSubmit(formData as UserInfo);
  }, [formData, onSubmit]);

  // 4. 渲染
  return (
    <div className={styles.container}>
      {/* 组件内容 */}
    </div>
  );
};

export default UserForm;
```

#### 2. Hooks 使用

```tsx
// ✅ 自定义 Hook
function useUserData(userId: number) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await UserService.getUser(userId);
        setUser(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : '未知错误');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return { user, loading, error };
}
```

### 样式规范

#### 1. CSS Modules

```scss
// index.module.scss
.container {
  padding: 16px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;

    .title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .actions {
      display: flex;
      gap: 8px;
    }
  }

  .content {
    .item {
      padding: 12px 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      &.active {
        background: #f6ffed;
        border-color: #b7eb8f;
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .container {
    padding: 12px;

    .header {
      flex-direction: column;
      gap: 12px;
    }
  }
}
```

#### 2. 样式变量

```scss
// theme/variables.scss
:root {
  // 颜色
  --primary-color: #1890ff;
  --success-color: #52c41a;
  --warning-color: #faad14;
  --error-color: #f5222d;
  
  // 间距
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  // 字体
  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;
  --font-size-xl: 18px;
  
  // 圆角
  --border-radius-sm: 4px;
  --border-radius-base: 6px;
  --border-radius-lg: 8px;
}
```

## 🔧 开发工作流

### Git 工作流

#### 1. 分支策略

```bash
# 主分支
main          # 生产环境代码
develop       # 开发环境代码

# 功能分支
feature/xxx   # 新功能开发
bugfix/xxx    # Bug 修复
hotfix/xxx    # 紧急修复
```

#### 2. 提交规范

```bash
# 提交格式
<type>(<scope>): <subject>

# 类型说明
feat:     新功能
fix:      Bug 修复
docs:     文档更新
style:    代码格式调整
refactor: 代码重构
test:     测试相关
chore:    构建工具、依赖更新

# 示例
feat(user): 添加用户管理功能
fix(form): 修复表单验证问题
docs(readme): 更新安装说明
```

#### 3. 代码审查

```bash
# 创建 Pull Request 前的检查清单
□ 代码符合规范
□ 通过所有测试
□ 添加必要的文档
□ 没有 console.log 等调试代码
□ 处理了所有 TypeScript 错误
□ 测试了主要功能路径
```

### 开发流程

#### 1. 新功能开发

```bash
# 1. 创建功能分支
git checkout -b feature/user-management

# 2. 开发功能
# ... 编写代码 ...

# 3. 提交代码
git add .
git commit -m "feat(user): 添加用户列表页面"

# 4. 推送分支
git push origin feature/user-management

# 5. 创建 Pull Request
# 在 GitHub/GitLab 上创建 PR
```

#### 2. Bug 修复

```bash
# 1. 创建修复分支
git checkout -b bugfix/form-validation

# 2. 修复问题
# ... 修复代码 ...

# 3. 测试修复
npm run test
npm run build

# 4. 提交修复
git commit -m "fix(form): 修复表单验证逻辑"
```

## 🧪 测试规范

### 单元测试

```tsx
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 集成测试

```tsx
// __tests__/pages/UserList.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import UserList from '../UserList';

const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(ctx.json({
      code: 200,
      data: [
        { id: 1, name: 'John', email: 'john@example.com' }
      ]
    }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('UserList Page', () => {
  it('displays user list', async () => {
    render(<UserList />);
    
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });
  });
});
```

## 🔍 调试技巧

### 1. React DevTools

```tsx
// 组件调试
const MyComponent = () => {
  const [state, setState] = useState(initialState);
  
  // 开发环境下的调试信息
  if (process.env.NODE_ENV === 'development') {
    console.log('Component state:', state);
  }
  
  return <div>{/* 组件内容 */}</div>;
};
```

### 2. 网络请求调试

```tsx
// API 调试
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 请求拦截器
apiClient.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Request:', config);
    }
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('API Response:', response);
    }
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    return Promise.reject(error);
  }
);
```

## 📊 性能优化

### 1. 组件优化

```tsx
// 使用 React.memo 优化组件
const ExpensiveComponent = React.memo<Props>(({ data, onUpdate }) => {
  return <div>{/* 复杂的渲染逻辑 */}</div>;
}, (prevProps, nextProps) => {
  // 自定义比较逻辑
  return prevProps.data.id === nextProps.data.id;
});

// 使用 useMemo 优化计算
const MyComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);

  return <div>{expensiveValue}</div>;
};

// 使用 useCallback 优化函数
const MyComponent = ({ onSubmit }) => {
  const handleClick = useCallback((data) => {
    onSubmit(data);
  }, [onSubmit]);

  return <Button onClick={handleClick}>Submit</Button>;
};
```

### 2. 代码分割

```tsx
// 动态导入组件
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <div>Loading...</div>,
  ssr: false
});

// 路由级别的代码分割
const UserManagement = dynamic(() => import('./pages/UserManagement'));
```

## 🚨 常见问题

### 1. TypeScript 错误

```typescript
// 问题：Property 'xxx' does not exist on type 'unknown'
// 解决：使用类型断言或类型守卫
const data = response.data as UserInfo;

// 或使用类型守卫
function isUserInfo(obj: unknown): obj is UserInfo {
  return typeof obj === 'object' && obj !== null && 'id' in obj;
}
```

### 2. 样式问题

```scss
// 问题：样式不生效
// 解决：检查 CSS Modules 导入
import styles from './index.module.scss';

// 使用样式
<div className={styles.container}>Content</div>
```

### 3. 路由问题

```tsx
// 问题：页面 404
// 解决：检查文件结构和命名
src/app/
  users/
    page.tsx        // 对应 /users 路由
    [id]/
      page.tsx      // 对应 /users/[id] 路由
```

通过遵循这些开发规范和最佳实践，可以确保项目代码的质量、可维护性和团队协作效率。
