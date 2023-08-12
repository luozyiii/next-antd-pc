import BlogDetail from "./detail";

type BlogDetailProps = {
  params: { blogId: string };
};

const BlogDetailPage = ({ params }: BlogDetailProps) => {
  return <BlogDetail blogId={params.blogId} />;
};

export default BlogDetailPage;
