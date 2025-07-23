'use client';

import { useCallback, useRef, useState } from 'react';
import { Button, Card, Space } from 'antd';
import { PageContent, Form } from '@/components';
import fields from './config';
import type { FormRef } from '@/components/form/form';

const CustomForm: React.FC = () => {
  const [preStr, setPreStr] = useState('');
  const formRef = useRef<FormRef>(null);

  const handleSubmit = useCallback(async () => {
    await formRef?.current?.validateFields();
    const _values = formRef?.current?.getFieldsValue();
    const pre = JSON.stringify(_values, null, 2);
    setPreStr(pre);
  }, []);

  const handleReset = useCallback(() => {
    formRef?.current?.reset();
  }, []);

  return (
    <PageContent>
      <Card>
        <Form
          ref={formRef}
          layout="inline"
          fields={fields as never}
          initialValues={{ price: { number: 1, unit: 'dollar' } }}
          requiredMark={false}
        />
        <pre>{preStr}</pre>
        <Space>
          <Button type="primary" onClick={handleSubmit}>
            提交
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Space>
      </Card>
    </PageContent>
  );
};

export default CustomForm;
