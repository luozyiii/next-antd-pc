# API 文档

本文档详细介绍了项目的 API 设计规范、接口定义和使用方法。

## 🌐 API 架构

### 基础架构

```
客户端 (Next.js)
    ↓
API Routes (Next.js API)
    ↓
业务逻辑层
    ↓
数据访问层
    ↓
数据库/外部服务
```

### 目录结构

```
src/app/api/
├── auth/                    # 认证相关 API
│   ├── login/
│   │   └── route.ts        # POST /api/auth/login
│   ├── logout/
│   │   └── route.ts        # POST /api/auth/logout
│   └── [...nextauth]/
│       └── route.ts        # NextAuth.js 配置
├── users/                   # 用户管理 API
│   ├── route.ts            # GET/POST /api/users
│   └── [id]/
│       └── route.ts        # GET/PUT/DELETE /api/users/[id]
├── books/                   # 书籍管理 API
│   ├── route.ts            # GET/POST /api/books
│   └── [id]/
│       └── route.ts        # GET/PUT/DELETE /api/books/[id]
└── upload/                  # 文件上传 API
    └── route.ts            # POST /api/upload
```

## 📋 API 规范

### 请求格式

#### HTTP 方法

- `GET`: 获取资源
- `POST`: 创建资源
- `PUT`: 更新资源（完整更新）
- `PATCH`: 更新资源（部分更新）
- `DELETE`: 删除资源

#### 请求头

```http
Content-Type: application/json
Authorization: Bearer <token>
Accept: application/json
```

#### URL 规范

```
# 资源集合
GET /api/users
POST /api/users

# 单个资源
GET /api/users/123
PUT /api/users/123
DELETE /api/users/123

# 嵌套资源
GET /api/users/123/posts
POST /api/users/123/posts

# 查询参数
GET /api/users?page=1&limit=10&search=john
```

### 响应格式

#### 统一响应结构

```typescript
interface ApiResponse<T = any> {
  code: number;           // 状态码
  data: T;               // 响应数据
  message: string;       // 响应消息
  success: boolean;      // 是否成功
  timestamp: number;     // 时间戳
}
```

#### 成功响应

```json
{
  "code": 200,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "操作成功",
  "success": true,
  "timestamp": 1640995200000
}
```

#### 错误响应

```json
{
  "code": 400,
  "data": null,
  "message": "请求参数错误",
  "success": false,
  "timestamp": 1640995200000,
  "errors": [
    {
      "field": "email",
      "message": "邮箱格式不正确"
    }
  ]
}
```

### 状态码规范

| 状态码 | 说明 | 使用场景 |
|--------|------|----------|
| 200 | 成功 | 请求成功 |
| 201 | 已创建 | 资源创建成功 |
| 204 | 无内容 | 删除成功 |
| 400 | 请求错误 | 参数错误、验证失败 |
| 401 | 未授权 | 未登录、token 无效 |
| 403 | 禁止访问 | 权限不足 |
| 404 | 未找到 | 资源不存在 |
| 409 | 冲突 | 资源已存在 |
| 422 | 无法处理 | 业务逻辑错误 |
| 500 | 服务器错误 | 系统内部错误 |

## 🔐 认证 API

### 登录

```typescript
// POST /api/auth/login
interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

interface LoginResponse {
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
  };
  token: string;
  refreshToken: string;
  expiresIn: number;
}
```

```typescript
// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { validateLogin, generateToken } from '@/utils/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // 验证参数
    if (!email || !password) {
      return NextResponse.json({
        code: 400,
        data: null,
        message: '邮箱和密码不能为空',
        success: false,
        timestamp: Date.now()
      }, { status: 400 });
    }

    // 验证用户
    const user = await validateLogin(email, password);
    if (!user) {
      return NextResponse.json({
        code: 401,
        data: null,
        message: '邮箱或密码错误',
        success: false,
        timestamp: Date.now()
      }, { status: 401 });
    }

    // 生成 token
    const token = generateToken(user);

    return NextResponse.json({
      code: 200,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },
        token,
        expiresIn: 3600
      },
      message: '登录成功',
      success: true,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      data: null,
      message: '服务器内部错误',
      success: false,
      timestamp: Date.now()
    }, { status: 500 });
  }
}
```

### 登出

```typescript
// POST /api/auth/logout
export async function POST(request: NextRequest) {
  try {
    // 从请求头获取 token
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    
    if (token) {
      // 将 token 加入黑名单
      await blacklistToken(token);
    }

    return NextResponse.json({
      code: 200,
      data: null,
      message: '登出成功',
      success: true,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      data: null,
      message: '服务器内部错误',
      success: false,
      timestamp: Date.now()
    }, { status: 500 });
  }
}
```

## 👥 用户管理 API

### 获取用户列表

```typescript
// GET /api/users
interface UserListQuery {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: 'active' | 'inactive';
}

interface UserListResponse {
  users: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

```typescript
// src/app/api/users/route.ts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const role = searchParams.get('role') || '';

    // 构建查询条件
    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (role) {
      where.role = role;
    }

    // 查询用户
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createdAt: true
        }
      }),
      prisma.user.count({ where })
    ]);

    return NextResponse.json({
      code: 200,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit)
        }
      },
      message: '获取成功',
      success: true,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      data: null,
      message: '服务器内部错误',
      success: false,
      timestamp: Date.now()
    }, { status: 500 });
  }
}
```

### 创建用户

```typescript
// POST /api/users
interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // 验证参数
    const errors = [];
    if (!name) errors.push({ field: 'name', message: '姓名不能为空' });
    if (!email) errors.push({ field: 'email', message: '邮箱不能为空' });
    if (!password) errors.push({ field: 'password', message: '密码不能为空' });

    if (errors.length > 0) {
      return NextResponse.json({
        code: 400,
        data: null,
        message: '请求参数错误',
        success: false,
        timestamp: Date.now(),
        errors
      }, { status: 400 });
    }

    // 检查邮箱是否已存在
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json({
        code: 409,
        data: null,
        message: '邮箱已存在',
        success: false,
        timestamp: Date.now()
      }, { status: 409 });
    }

    // 创建用户
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'user'
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    return NextResponse.json({
      code: 201,
      data: user,
      message: '用户创建成功',
      success: true,
      timestamp: Date.now()
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      data: null,
      message: '服务器内部错误',
      success: false,
      timestamp: Date.now()
    }, { status: 500 });
  }
}
```

## 📚 书籍管理 API

### 获取书籍列表

```typescript
// GET /api/books
export async function GET(request: NextRequest) {
  try {
    // 模拟数据
    const books = [
      {
        id: 1,
        title: 'Next.js 实战指南',
        author: '张三',
        isbn: '978-7-111-12345-6',
        publishDate: '2023-01-01',
        category: 'technology',
        status: 'available'
      },
      {
        id: 2,
        title: 'React 深入浅出',
        author: '李四',
        isbn: '978-7-111-12345-7',
        publishDate: '2023-02-01',
        category: 'technology',
        status: 'borrowed'
      }
    ];

    return NextResponse.json({
      code: 200,
      data: books,
      message: '获取成功',
      success: true,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      data: null,
      message: '服务器内部错误',
      success: false,
      timestamp: Date.now()
    }, { status: 500 });
  }
}
```

## 📁 文件上传 API

### 上传文件

```typescript
// POST /api/upload
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({
        code: 400,
        data: null,
        message: '请选择文件',
        success: false,
        timestamp: Date.now()
      }, { status: 400 });
    }

    // 验证文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        code: 400,
        data: null,
        message: '不支持的文件类型',
        success: false,
        timestamp: Date.now()
      }, { status: 400 });
    }

    // 验证文件大小 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({
        code: 400,
        data: null,
        message: '文件大小不能超过 5MB',
        success: false,
        timestamp: Date.now()
      }, { status: 400 });
    }

    // 生成文件名
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${file.name}`;
    const path = join(process.cwd(), 'public/uploads', filename);

    // 保存文件
    await writeFile(path, buffer);

    return NextResponse.json({
      code: 200,
      data: {
        filename,
        url: `/uploads/${filename}`,
        size: file.size,
        type: file.type
      },
      message: '上传成功',
      success: true,
      timestamp: Date.now()
    });
  } catch (error) {
    return NextResponse.json({
      code: 500,
      data: null,
      message: '上传失败',
      success: false,
      timestamp: Date.now()
    }, { status: 500 });
  }
}
```

## 🛠️ 工具函数

### API 客户端

```typescript
// src/utils/api.ts
interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: any;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string = '/api') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    };

    if (options.body) {
      config.body = JSON.stringify(options.body);
    }

    // 添加认证 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const response = await fetch(url, config);
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.message);
    }

    return data.data;
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
```

### 使用示例

```typescript
// 在组件中使用
import { apiClient } from '@/utils/api';

// 获取用户列表
const users = await apiClient.get<UserListResponse>('/users?page=1&limit=10');

// 创建用户
const newUser = await apiClient.post<User>('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password123'
});

// 更新用户
const updatedUser = await apiClient.put<User>(`/users/${userId}`, {
  name: 'Jane Doe'
});

// 删除用户
await apiClient.delete(`/users/${userId}`);
```

## 🧪 API 测试

### 单元测试

```typescript
// __tests__/api/users.test.ts
import { createMocks } from 'node-mocks-http';
import handler from '@/app/api/users/route';

describe('/api/users', () => {
  it('should return users list', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      query: { page: '1', limit: '10' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    const data = JSON.parse(res._getData());
    expect(data.success).toBe(true);
    expect(Array.isArray(data.data.users)).toBe(true);
  });
});
```

通过这套 API 设计规范，可以构建出结构清晰、易于维护的后端接口系统。
