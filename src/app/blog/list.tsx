import { CustomLayout, PageContent } from "@/components";
import Link from "next/link";

const BlogList = () => {
  return (
    <CustomLayout>
      <PageContent title="博客列表　">
        <h3>欢迎欢迎👏👏👏，这是博客列表</h3>
        <p>
          <Link href="/blog/first">特别人物一</Link>
        </p>
        <p>
          <Link href="/blog/second">特别人物二</Link>
        </p>
        <p>
          <Link href="/blog/123">123</Link>
        </p>
      </PageContent>
    </CustomLayout>
  );
};

export default BlogList;
