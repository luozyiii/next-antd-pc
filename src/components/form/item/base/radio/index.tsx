import { useCallback, useEffect, useState } from 'react';
import { Radio, Space } from 'antd';
import type { RadioGroupProps } from 'antd';

interface CustomeRadioGroupProps extends RadioGroupProps {
  direction?: 'horizontal' | 'vertical';
  fetch?: (params?: object) => Promise<any>;
  fetchParams?: object;
  responseHandler?: (res: any) => any;
  fieldNames?: { label: string; value: string };
}

// 实现重点： 数据源异步加载
const Comp = ({
  options,
  direction = 'horizontal',
  fetch,
  fetchParams,
  fieldNames,
  responseHandler = (res: any) => res,
  ...other
}: CustomeRadioGroupProps) => {
  const [ops, setOps] = useState<any[]>([]);

  const getOptions = useCallback(async () => {
    try {
      if (fetch) {
        const res = responseHandler(await fetch({ ...fetchParams }));
        const lastRes = fieldNames
          ? res.map((item: any) => {
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
        {ops?.map((option: any, index: number) => {
          const { value, label, ...rest } = option;
          return (
            <Radio key={index} value={value} {...rest}>
              {label}
            </Radio>
          );
        })}
      </Space>
    </Radio.Group>
  );
};

export default Comp;
