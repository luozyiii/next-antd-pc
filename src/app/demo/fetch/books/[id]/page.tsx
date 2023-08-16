import { getBookDetail } from "@/apis";
import { PageContent } from "@/components";

type BookDetailProps = {
  params: { id: string };
};

const BookDetail = async ({ params }: BookDetailProps) => {
  const { data: bookInfo } = await getBookDetail(params.id);

  return (
    <PageContent back title={bookInfo?.name}>
      <p>辣评：{bookInfo?.description}</p>
    </PageContent>
  );
};

export default BookDetail;
