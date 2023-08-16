import { PageContent } from "@/components";

type BlogDetailProps = {
  blogId: string;
};

async function getBlogDetail(blogId: string) {
  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users/${blogId}`
  );
  return res.json();
}

// eslint-disable-next-line @next/next/no-async-client-component
const BlogDetail = async ({ blogId }: BlogDetailProps) => {
  const [{ user }] = await Promise.all([getBlogDetail(blogId)]);

  return (
    <PageContent back title={`【${blogId}】的博客`}>
      <h1>欢迎欢迎👏👏👏</h1>
      <div style={{ width: "100%", padding: 12 }}>
        <p>First Name {user?.first_name}</p>
        <p>Last Name: {user?.last_name}</p>
        <p>Job: {user?.job}</p>
        <p>Email: {user?.email}</p>
        <p>Phone: {user?.phone}</p>
        <p>Country: {user?.country}</p>
      </div>
    </PageContent>
  );
};

export default BlogDetail;
