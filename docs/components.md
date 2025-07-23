# 组件系统

本文档详细介绍了项目中的组件系统设计和使用方法。

## 🧩 组件分类

### 基础组件 (Base Components)

位于 `src/components/` 目录下的可复用基础组件。

### 业务组件 (Business Components)

结合具体业务场景的组件，通常是基础组件的组合。

### 页面组件 (Page Components)

位于 `src/app/` 目录下，对应具体的路由页面。

## 📋 表单组件系统

### Form 主表单组件

**位置**: `src/components/form/form.tsx`

**功能**: 统一的表单容器，支持配置化表单构建。

#### 基本用法

```tsx
import { Form } from '@/components';

const fields = [
  {
    type: 'input',
    label: '用户名',
    name: 'username',
    rules: [{ required: true, message: '请输入用户名' }]
  },
  {
    type: 'select',
    label: '角色',
    name: 'role',
    cProps: {
      options: [
        { label: '管理员', value: 'admin' },
        { label: '用户', value: 'user' }
      ]
    }
  }
];

function MyForm() {
  const [form] = Form.useForm();
  
  return (
    <Form
      form={form}
      fields={fields}
      onFinish={(values) => console.log(values)}
    />
  );
}
```

#### Props 说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| fields | FItemProps[] | [] | 表单字段配置 |
| layout | 'horizontal' \| 'vertical' \| 'inline' | 'horizontal' | 表单布局 |
| labelCol | ColProps | - | 标签列配置 |
| wrapperCol | ColProps | - | 控件列配置 |
| initialValues | object | - | 初始值 |
| onFinish | (values) => void | - | 提交回调 |

### 表单项组件

#### Input 输入框

```tsx
{
  type: 'input',
  label: '用户名',
  name: 'username',
  cProps: {
    placeholder: '请输入用户名',
    maxLength: 50
  }
}
```

#### Select 选择器

```tsx
{
  type: 'select',
  label: '状态',
  name: 'status',
  cProps: {
    options: [
      { label: '启用', value: 1 },
      { label: '禁用', value: 0 }
    ],
    placeholder: '请选择状态'
  }
}
```

#### DatePicker 日期选择

```tsx
{
  type: 'datepicker',
  label: '创建日期',
  name: 'createDate',
  cProps: {
    format: 'YYYY-MM-DD',
    placeholder: '请选择日期'
  }
}
```

#### Upload 文件上传

```tsx
{
  type: 'upload',
  label: '头像',
  name: 'avatar',
  cProps: {
    listType: 'picture-card',
    maxCount: 1,
    accept: 'image/*'
  }
}
```

### FilterForm 筛选表单

**位置**: `src/components/form/filter-form/index.tsx`

**功能**: 用于列表页面的筛选功能。

```tsx
import { FilterForm } from '@/components';

const filterFields = [
  {
    type: 'input',
    label: '关键词',
    name: 'keyword',
    cProps: { placeholder: '请输入关键词' }
  },
  {
    type: 'select',
    label: '状态',
    name: 'status',
    cProps: {
      options: [
        { label: '全部', value: '' },
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 }
      ]
    }
  }
];

function ListPage() {
  return (
    <FilterForm
      fields={filterFields}
      onSearch={(values) => console.log('搜索:', values)}
      onReset={() => console.log('重置')}
    />
  );
}
```

### ModalForm 弹窗表单

**位置**: `src/components/form/modal-form/index.tsx`

**功能**: 弹窗中的表单，常用于新增/编辑操作。

```tsx
import { ModalForm } from '@/components';

function ListPage() {
  return (
    <ModalForm fields={formFields}>
      新增用户
    </ModalForm>
  );
}
```

## 🎨 布局组件

### PageContent 页面容器

**位置**: `src/components/layout/page-content/index.tsx`

**功能**: 统一的页面内容容器，提供一致的页面布局。

```tsx
import { PageContent } from '@/components';

function MyPage() {
  return (
    <PageContent title="页面标题" back>
      <div>页面内容</div>
    </PageContent>
  );
}
```

#### Props 说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| title | string | - | 页面标题 |
| back | boolean | false | 是否显示返回按钮 |
| extra | ReactNode | - | 标题右侧额外内容 |
| children | ReactNode | - | 页面内容 |

### ThemeContent 主题容器

**位置**: `src/components/layout/theme-content/index.tsx`

**功能**: 提供主题配置的容器组件。

```tsx
import { ThemeContent } from '@/components';

function App() {
  return (
    <ThemeContent>
      <div>应用内容</div>
    </ThemeContent>
  );
}
```

## 🧭 菜单组件

### SideMenu 侧边菜单

**位置**: `src/components/menu/side-menu.tsx`

**功能**: 侧边导航菜单，支持多级菜单和路由跳转。

```tsx
import { SideMenu } from '@/components';

function Layout() {
  return (
    <div className="layout">
      <SideMenu />
      <div className="content">
        {/* 页面内容 */}
      </div>
    </div>
  );
}
```

### TopMenu 顶部菜单

**位置**: `src/components/menu/top-menu.tsx`

**功能**: 顶部导航菜单，适用于水平布局。

```tsx
import { TopMenu } from '@/components';

function Header() {
  return (
    <header>
      <TopMenu />
    </header>
  );
}
```

## 👤 用户组件

### LoginBtn 登录按钮

**位置**: `src/components/user/LoginBtn.tsx`

**功能**: 集成认证状态的登录/登出按钮。

```tsx
import { LoginBtn } from '@/components';

function Header() {
  return (
    <div className="header">
      <LoginBtn />
    </div>
  );
}
```

## 🔧 组件开发规范

### 1. 组件结构

```tsx
// 导入依赖
import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

// 类型定义
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// 组件实现
const MyComponent: React.FC<MyComponentProps> = ({ title, onClick }) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <Button onClick={onClick}>点击</Button>
    </div>
  );
};

export default MyComponent;
```

### 2. 命名规范

- **组件名**: 使用 PascalCase，如 `MyComponent`
- **文件名**: 使用 kebab-case，如 `my-component.tsx`
- **样式类**: 使用 camelCase，如 `.myContainer`

### 3. Props 设计

- **必需属性**: 放在前面，使用明确的类型
- **可选属性**: 使用 `?` 标记，提供默认值
- **回调函数**: 使用 `on` 前缀，如 `onClick`
- **样式属性**: 使用 `className` 和 `style`

### 4. 样式规范

```scss
// index.module.scss
.container {
  padding: 16px;
  border-radius: 8px;
  background: #fff;
  
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  
  .content {
    color: #666;
    line-height: 1.6;
  }
}
```

### 5. 类型定义

```tsx
// 基础类型
interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// 扩展类型
interface MyComponentProps extends BaseProps {
  title: string;
  type?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}
```

## 📦 组件导出

统一在 `src/components/index.ts` 中导出组件：

```tsx
// 表单组件
export { default as Form } from './form/form';
export { default as FilterForm } from './form/filter-form';
export { default as ModalForm } from './form/modal-form';

// 布局组件
export { default as PageContent } from './layout/page-content';
export { default as ThemeContent } from './layout/theme-content';

// 菜单组件
export { default as SideMenu } from './menu/side-menu';
export { default as TopMenu } from './menu/top-menu';

// 用户组件
export { default as LoginBtn } from './user/LoginBtn';
```

## 🧪 组件测试

### 单元测试示例

```tsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders title correctly', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
  
  it('calls onClick when button is clicked', () => {
    const handleClick = jest.fn();
    render(<MyComponent title="Test" onClick={handleClick} />);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## 🎯 最佳实践

1. **保持组件简单**: 单一职责原则
2. **使用 TypeScript**: 完整的类型定义
3. **样式模块化**: 使用 CSS Modules
4. **性能优化**: 使用 React.memo、useMemo、useCallback
5. **可访问性**: 添加适当的 ARIA 属性
6. **文档完善**: 提供清晰的使用示例

通过这套组件系统，可以快速构建一致性强、可维护性高的用户界面。
