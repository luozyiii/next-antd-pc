type BlogDetailProps = {
  blogId: string;
};

const BlogDetail = ({ params }: { params: BlogDetailProps }) => {
  return <h1>博客详情： {params.blogId}</h1>;
};

export default BlogDetail;
