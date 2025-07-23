import { getBookDetail } from '@/apis';
import { PageContent } from '@/components';

type BookDetailProps = { params: Promise<{ id: string }> };

const BookDetail = async ({ params }: BookDetailProps) => {
  const { id } = await params;
  const { data: bookInfo } = await getBookDetail(id);

  return (
    <PageContent back title={bookInfo?.name}>
      <p>辣评：{bookInfo?.description}</p>
    </PageContent>
  );
};

export default BookDetail;
