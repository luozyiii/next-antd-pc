'use client';

import ContentLoader from 'react-content-loader';
import Link from 'next/link';
import useSWR from 'swr';
import { Card } from 'antd';
import styles from './page.module.css';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

function SwrDemo() {
  const { data, error, isLoading } = useSWR('/api/book', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) {
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
        {data?.data?.map((book: any, key: number) => {
          const _href = '/demo/fetch/books/' + String(book?.id);
          return (
            <li key={key}>
              <Link href={_href}>{book?.name}</Link>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}

export default SwrDemo;
