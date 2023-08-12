"use client";

import { useEffect, useState } from "react";
import { CustomLayout, PageContent } from "@/components";

type BlogDetailProps = {
  blogId: string;
};

const BlogDetail = ({ blogId }: BlogDetailProps) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const URL = `https://api.slingacademy.com/v1/sample-data/users/${blogId}`;
        const res = await fetch(URL);
        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomLayout>
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
    </CustomLayout>
  );
};

export default BlogDetail;
