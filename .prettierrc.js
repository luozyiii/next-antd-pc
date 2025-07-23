module.exports = {
  // 基本格式化设置
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  
  // 禁用 Prettier 的 import 排序，让 ESLint 来处理
  // 这样可以避免与 ESLint 的 import/order 规则冲突
  organizeImportsSkipDestructiveCodeActions: true,
  
  // 文件类型特定设置
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      options: {
        parser: 'typescript',
      },
    },
    {
      files: ['*.js', '*.jsx'],
      options: {
        parser: 'babel',
      },
    },
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['*.css', '*.scss'],
      options: {
        parser: 'css',
      },
    },
  ],
};
