import Link from 'next/link';
import { Card } from 'antd';
import { getData } from '@/apis';
import styles from './page.module.css';

export default async function ApiDemo() {
  const res = await getData();

  return (
    <Card>
      <h6 className={styles.title}>【服务端渲染】API 路由转发第三方接口</h6>
      <ul className={styles.list}>
        {res?.data?.map((book: any, key: number) => {
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
