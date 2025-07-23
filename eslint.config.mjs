import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import typescriptParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  // 基础配置
  js.configs.recommended,

  // Next.js 配置
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      'react-hooks': reactHooks,
      react: react,
      'unused-imports': unusedImports,
    },
    rules: {
      // Import 排序规则
      'import/order': [
        'warn',
        {
          groups: [
            'builtin', // Node.js 内置模块
            'external', // 第三方库
            'internal', // 内部模块 (@/...)
            'parent', // 父级目录 (../)
            'sibling', // 同级目录 (./)
            'index', // index 文件
            'object', // object imports
            'type', // 类型导入
          ],
          pathGroups: [
            // React 相关 - 最高优先级
            { pattern: 'react', group: 'builtin', position: 'before' },
            { pattern: 'react/**', group: 'builtin', position: 'before' },

            // Next.js 相关 - 在 React 之后
            { pattern: 'next', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },

            // Antd 相关 - 在框架之后
            { pattern: 'antd', group: 'external', position: 'after' },
            { pattern: 'antd/**', group: 'external', position: 'after' },
            { pattern: '@ant-design/**', group: 'external', position: 'after' },

            // 内部模块
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'type'],
          'newlines-between': 'never',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
            orderImportKind: 'asc',
          },
          distinctGroup: false,
          warnOnUnassignedImports: false,
        },
      ],

      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // 未使用导入规则
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      // React 规则
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-key': 'warn',
      'react/no-array-index-key': 'warn',
    },
  },

  // 忽略文件
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'dist/**', '*.config.js', '*.config.mjs'],
  },
];
