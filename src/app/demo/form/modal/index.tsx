import { PageContent, ModalForm } from '@/components';
import { fields } from './config';

const ModalFormPage = () => {
  return (
    <PageContent>
      <ModalForm fields={fields as never}>新增</ModalForm>
    </PageContent>
  );
};

export default ModalFormPage;
