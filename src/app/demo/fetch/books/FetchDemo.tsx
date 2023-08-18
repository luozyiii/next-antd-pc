import Link from 'next/link';
import { Card } from 'antd';
import { getBooks } from '@/apis';
import styles from './page.module.css';

export default async function FetchDemo() {
  const { data: books } = await getBooks();

  return (
    <Card>
      <h6 className={styles.title}>【服务端渲染】fetch 直接请求第三方接口</h6>
      <ul className={styles.list}>
        {books?.map((book: any, key: number) => {
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
