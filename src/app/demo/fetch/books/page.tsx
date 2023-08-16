import { PageContent } from "@/components";
import { getBooks } from "@/apis";
import Link from "next/link";

export default async function BooksPage() {
  const { data: books } = await getBooks();

  return (
    <PageContent>
      <p>该示例演示了，列表数据和详情数据的获取。</p>
      <br />
      {books?.map((book: any, key: number) => {
        const _href = "/demo/fetch/books/" + String(book?.id);
        return (
          <li key={key}>
            <Link href={_href}>{book?.name}</Link>
          </li>
        );
      })}
    </PageContent>
  );
}
