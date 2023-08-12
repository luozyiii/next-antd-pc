import { PageContent, ModalForm } from "@/components";
import { fields } from "./config";

const ModalFormPage = () => {
  return (
    <PageContent title="弹窗表单">
      <ModalForm fields={fields}>新增</ModalForm>
    </PageContent>
  );
};

export default ModalFormPage;
