"use client";

import { useCallback, useRef, useState } from "react";
import { Button, Space } from "antd";
import { PageContent, Form } from "@/components";
import type { FormRef } from "@/components/form/form";
import fields from "./config";

const LinkageForm: React.FC = () => {
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

  const handleClick = useCallback(() => {
    formRef?.current?.setFieldsValue({
      gender: "secrecy",
    });
  }, []);

  return (
    <PageContent title="表单联动">
      <p>shouldUpdate 和 displayRules搭配实现联动</p>
      <Form
        ref={formRef}
        fields={fields}
        // initialValues={{}}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 500 }}
        requiredMark={true}
      />
      <pre>{preStr}</pre>
      <Space>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button onClick={handleReset}>重置</Button>
        <Button type="primary" onClick={handleClick}>
          性别保密
        </Button>
      </Space>
    </PageContent>
  );
};

export default LinkageForm;
