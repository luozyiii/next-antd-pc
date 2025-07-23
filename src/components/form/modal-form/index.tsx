'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, Modal } from 'antd';
import Form from '../form';
import type { FormRef } from '../form';
import type { RecordType } from '@/types';

interface ModalFormProps {
  fields: Array<{
    type: string;
    label: string;
    name: string;
    [key: string]: unknown;
  }>;
  children: React.ReactElement | string;
  onSearch?: (params: RecordType) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ fields, children }: ModalFormProps) => {
  const formRef = useRef<FormRef>(null);

  const [open, setOpen] = useState(false);
  const openModal = useCallback(() => {
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);
  return (
    <>
      <Modal title="这是一个标题" open={open} onCancel={closeModal}>
        <Form ref={formRef} fields={fields as never} />
      </Modal>
      <Button onClick={openModal}>{children}</Button>
    </>
  );
};

export default ModalForm;
