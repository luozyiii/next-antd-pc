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
