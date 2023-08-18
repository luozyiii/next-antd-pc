'use client';

import Link from 'next/link';
import useSWR from 'swr';
import { Card } from 'antd';
import styles from './page.module.css';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

function SwrDemo() {
  const { data, error, isLoading } = useSWR('/api/book', fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

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
