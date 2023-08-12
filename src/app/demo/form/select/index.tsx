"use client";

import { useCallback, useRef, useState } from "react";
import { Button, Space } from "antd";
import { PageContent, Form } from "@/components";
import type { FormRef } from "@/components/form/form";
import fields from "./config";

const SelectForm: React.FC = () => {
  const [preStr, setPreStr] = useState("");
  const formRef = useRef<FormRef>();

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
    <PageContent title="选择器">
      <Form
        ref={formRef}
        layout="inline"
        fields={fields}
        initialValues={{}}
        requiredMark={false}
      />
      <pre>{preStr}</pre>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Space>
    </PageContent>
  );
};

export default SelectForm;
