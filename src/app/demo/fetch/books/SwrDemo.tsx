'use client';

import Link from 'next/link';
import ContentLoader from 'react-content-loader';
import { Card } from 'antd';
import { useFetch } from '@/hooks';
import styles from './page.module.css';

interface Book {
  id: number;
  name: string;
}

interface SwrDemoProps {
  token?: string;
}

// 偶发 dev 环境 报警告，生产无此问题
function SwrDemo({ token }: SwrDemoProps) {
  const {
    data,
    error,
    loading = true,
  } = useFetch<Book[]>({
    url: '/book/list',
    method: 'get',
    token,
  });

  if (error) return <div>failed to load</div>;
  if (loading) {
    return (
      <ContentLoader viewBox="0 0 900 100">
        <rect x="20" y="22" rx="0" ry="0" width="300" height="18" />
        <rect x="20" y="48" rx="0" ry="0" width="100" height="12" />
        <rect x="20" y="68" rx="0" ry="0" width="100" height="12" />
      </ContentLoader>
    );
  }

  return (
    <Card>
      <h6 className={styles.title}>【客户端渲染】swr 的简单应用 （可结合骨架屏提升用户体验）</h6>
      <ul className={styles.list}>
        {Array.isArray(data) &&
          data.map((book: Book) => {
            const _href = '/demo/fetch/books/' + String(book.id);
            return (
              <li key={book.id}>
                <Link href={_href}>{book.name}</Link>
              </li>
            );
          })}
      </ul>
    </Card>
  );
}

export default SwrDemo;
