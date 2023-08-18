'use client';

import React, { useCallback, useState, useRef } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import Form from '../form';
import styles from './index.module.scss';
import type { FormRef } from '../form';

interface FilterFormProps {
  fields: any[];
  showExpand?: boolean; // 展示/收起; 后续用动态布局替代该属性
  defaultExpand?: boolean; // 默认收起
  onSearch?: (params: any) => void;
  onReset?: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  fields,
  showExpand = true,
  defaultExpand = false,
  onSearch,
  onReset,
}) => {
  const formRef = useRef<FormRef>(null);
  const [expand, setExpand] = useState(defaultExpand);
  const [loading, setLoading] = useState(false);

  const expandOnChange = useCallback(() => {
    setExpand(!expand);
  }, [expand]);

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await formRef?.current?.validateFields();
      const _values = formRef?.current?.getFieldsValue();
      onSearch?.(_values);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [onSearch]);

  const handleReset = useCallback(() => {
    formRef?.current?.reset();
    onReset?.();
  }, [onReset]);

  return (
    <div className={styles.box}>
      <Form
        ref={formRef}
        grid
        responsive
        fields={fields}
        className={styles.formBox}
        style={{ height: showExpand ? (!expand ? '56px' : 'auto') : 'auto' }}
      />
      <div className={styles.actionBtn}>
        <Space>
          <Button type="primary" loading={loading} onClick={handleSubmit}>
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
          {showExpand && (
            <span className={styles.expand} onClick={expandOnChange}>
              {expand ? (
                <>
                  收起 <UpOutlined />
                </>
              ) : (
                <>
                  展开 <DownOutlined />
                </>
              )}
            </span>
          )}
        </Space>
      </div>
    </div>
  );
};

export default FilterForm;
