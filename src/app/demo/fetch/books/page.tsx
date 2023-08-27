import { cookies } from 'next/headers';
import { PageContent } from '@/components';
import ApiDemo from './ApiDemo';
import FetchDemo from './FetchDemo';
import SwrDemo from './SwrDemo';

export default function BooksPage() {
  const token = cookies().get('token')?.value || '';

  return (
    <PageContent>
      <h4 style={{ marginBottom: '10px' }}>该页面演示了三种请求方式来获取列表数据。</h4>
      <FetchDemo />
      <br />
      <ApiDemo />
      <br />
      <SwrDemo token={token} />
    </PageContent>
  );
}
