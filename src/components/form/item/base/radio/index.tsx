import { useCallback, useEffect, useState } from 'react';
import { Radio, Space } from 'antd';
import type { RadioGroupProps } from 'antd';

interface CustomeRadioGroupProps extends RadioGroupProps {
  direction?: 'horizontal' | 'vertical';
  fetch?: (params?: object) => Promise<unknown>;
  fetchParams?: object;
  responseHandler?: (res: unknown) => Array<Record<string, unknown>>;
  fieldNames?: { label: string; value: string };
}

// 实现重点： 数据源异步加载
const Comp = ({
  options,
  direction = 'horizontal',
  fetch,
  fetchParams,
  fieldNames,
  responseHandler = (res: unknown) => res as Array<Record<string, unknown>>,
  ...other
}: CustomeRadioGroupProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ops, setOps] = useState<any[]>([]);

  const getOptions = useCallback(async () => {
    try {
      if (fetch) {
        const res = responseHandler(await fetch({ ...fetchParams }));
        const lastRes = fieldNames
          ? res.map((item: Record<string, unknown>) => {
              return {
                label: item[fieldNames.label],
                value: item[fieldNames.value],
              };
            })
          : res;
        setOps(lastRes);
      } else {
        setOps(options || []);
      }
    } finally {
      /* empty */
    }
  }, [fetch, fetchParams, fieldNames, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return (
    <Radio.Group {...other}>
      <Space direction={direction}>
        {ops?.map((option: Record<string, unknown>, index: number) => {
          const { value, label, ...rest } = option;
          return (
            <Radio key={String(value) || `radio-${index}`} value={value} {...rest}>
              {String(label)}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default Comp;
