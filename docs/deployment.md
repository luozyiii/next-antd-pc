# 部署指南

本文档详细介绍了项目的部署方案和生产环境配置。

## 🚀 部署方式

### 1. Vercel 部署 (推荐)

Vercel 是 Next.js 的官方部署平台，提供最佳的性能和开发体验。

#### 自动部署

```bash
# 1. 安装 Vercel CLI
npm i -g vercel

# 2. 登录 Vercel
vercel login

# 3. 部署项目
vercel

# 4. 生产环境部署
vercel --prod
```

#### GitHub 集成

1. 将代码推送到 GitHub
2. 在 Vercel 控制台导入项目
3. 配置环境变量
4. 自动部署完成

#### 环境变量配置

```bash
# Vercel 环境变量
NEXT_PUBLIC_API_URL=https://api.example.com
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

### 2. Docker 部署

#### Dockerfile

```dockerfile
# 使用 Node.js 官方镜像
FROM node:18-alpine AS base

# 安装依赖阶段
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制依赖文件
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 构建应用
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 运行阶段
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# 创建用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://api.example.com
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped
```

#### 部署命令

```bash
# 构建镜像
docker build -t next-antd-pc .

# 运行容器
docker run -p 3000:3000 next-antd-pc

# 使用 Docker Compose
docker-compose up -d
```

### 3. 传统服务器部署

#### PM2 部署

```bash
# 1. 安装 PM2
npm install -g pm2

# 2. 构建项目
npm run build

# 3. 启动应用
pm2 start npm --name "next-antd-pc" -- start

# 4. 保存 PM2 配置
pm2 save
pm2 startup
```

#### PM2 配置文件

```javascript
// ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'next-antd-pc',
      script: 'npm',
      args: 'start',
      cwd: '/path/to/your/app',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true
    }
  ]
};
```

## 🔧 生产环境配置

### Next.js 配置

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 输出配置
  output: 'standalone',
  
  // 压缩配置
  compress: true,
  
  // 图片优化
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // 安全头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true
      }
    ];
  }
};

module.exports = nextConfig;
```

### 环境变量

```bash
# .env.production
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.production.com
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-production-secret

# 数据库配置
DATABASE_URL=postgresql://user:password@host:port/database

# Redis 配置
REDIS_URL=redis://host:port

# 监控配置
SENTRY_DSN=https://your-sentry-dsn
```

## 🌐 CDN 和缓存

### Nginx 配置

```nginx
# nginx.conf
server {
    listen 80;
    server_name your-domain.com;
    
    # 重定向到 HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;
    
    # SSL 配置
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    
    # 静态资源缓存
    location /_next/static/ {
        alias /app/.next/static/;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # 图片缓存
    location ~* \.(jpg|jpeg|png|gif|ico|svg)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }
    
    # API 代理
    location /api/ {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 主应用代理
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### CDN 配置

```javascript
// next.config.js
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' 
    ? 'https://cdn.your-domain.com' 
    : '',
    
  images: {
    loader: 'custom',
    loaderFile: './src/utils/imageLoader.js'
  }
};
```

## 📊 监控和日志

### 性能监控

```javascript
// src/utils/analytics.js
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_location: url,
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
```

### 错误监控

```javascript
// src/utils/sentry.js
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

export default Sentry;
```

### 日志配置

```javascript
// src/utils/logger.js
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export default logger;
```

## 🔒 安全配置

### 安全头

```javascript
// next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  },
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin'
  }
];

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 环境变量安全

```bash
# 敏感信息使用环境变量
DATABASE_PASSWORD=your-secure-password
JWT_SECRET=your-jwt-secret
API_KEY=your-api-key

# 不要在代码中硬编码敏感信息
# ❌ 错误做法
const apiKey = 'sk-1234567890abcdef';

# ✅ 正确做法
const apiKey = process.env.API_KEY;
```

## 🚨 故障排除

### 常见问题

#### 1. 构建失败

```bash
# 检查依赖
npm audit
npm update

# 清理缓存
npm run clean
rm -rf .next
rm -rf node_modules
npm install
```

#### 2. 内存不足

```javascript
// next.config.js
module.exports = {
  experimental: {
    workerThreads: false,
    cpus: 1
  }
};
```

#### 3. 静态资源 404

```javascript
// next.config.js
module.exports = {
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-app' : '',
};
```

### 性能优化

```javascript
// 代码分割
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <p>Loading...</p>,
});

// 图片优化
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={500}
  height={300}
  priority
/>
```

## 📈 部署检查清单

- [ ] 环境变量配置正确
- [ ] 构建成功无错误
- [ ] 静态资源正常加载
- [ ] API 接口连接正常
- [ ] SSL 证书配置
- [ ] 域名解析正确
- [ ] 缓存策略配置
- [ ] 监控和日志配置
- [ ] 安全头配置
- [ ] 性能测试通过
- [ ] 备份策略制定

通过遵循这些部署指南，可以确保应用在生产环境中稳定、安全、高效地运行。
