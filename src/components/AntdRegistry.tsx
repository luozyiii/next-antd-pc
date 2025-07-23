'use client';

import React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo<Entity>(() => createCache(), []);
  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />);
  return (
    <StyleProvider cache={cache}>
      <ConfigProvider locale={zhCN}>{children}</ConfigProvider>
    </StyleProvider>
  );
};

export default StyledComponentsRegistry;
