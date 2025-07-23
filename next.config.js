const withBundleAnalyzer = require('@next/bundle-analyzer')({ enabled: process.env.ANALYZE === 'true' });

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 图片优化配置
  images: { domains: ['images.pexels.com'], formats: ['image/webp', 'image/avif'], minimumCacheTTL: 60 },

  // 编译优化
  compiler: { removeConsole: process.env.NODE_ENV === 'production' },

  // 性能优化
  poweredByHeader: false,
  compress: true,

  // ESLint 配置 - 暂时忽略构建时的 ESLint 检查
  eslint: { ignoreDuringBuilds: false },

  // 构建优化
  output: 'standalone',

  // 实验性功能
  experimental: { optimizePackageImports: ['antd', 'lodash-es'] },

  // Turbopack 配置
  turbopack: { rules: { '*.svg': { loaders: ['@svgr/webpack'], as: '*.js' } } },

  // Webpack 配置优化
  webpack: (config, { dev, isServer }) => {
    // 生产环境优化
    if (!dev && !isServer) {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        antd: { name: 'antd', chunks: 'all', test: /[\\/]node_modules[\\/](antd|@ant-design)[\\/]/, priority: 20 },
        vendor: { name: 'vendor', chunks: 'all', test: /[\\/]node_modules[\\/]/, priority: 10 },
      };
    }

    return config;
  },
};

module.exports = withBundleAnalyzer(nextConfig);
