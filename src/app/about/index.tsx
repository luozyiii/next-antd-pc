import { CustomLayout, PageContent } from "@/components";
import { Button } from "antd";

const About = () => {
  return (
    <CustomLayout>
      <PageContent title="关于我们">
        <div>
          <Button type="primary">关于我们</Button>
        </div>
      </PageContent>
    </CustomLayout>
  );
};

export default About;
