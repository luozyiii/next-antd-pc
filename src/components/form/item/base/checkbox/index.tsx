import { useCallback, useEffect, useState } from 'react';
import { Checkbox } from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox/Group';

interface CustomeCheckboxGroupProps extends CheckboxGroupProps {
  fetch?: (params?: object) => Promise<any>;
  fetchParams?: object;
  responseHandler?: (res: any) => any;
  fieldNames?: { label: string; value: string };
}

// 实现重点： 数据源异步加载
const Comp = ({
  options,
  fetch,
  fetchParams,
  fieldNames,
  responseHandler = (res: any) => res,
  ...other
}: CustomeCheckboxGroupProps) => {
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

  return <Checkbox.Group {...other} options={ops}></Checkbox.Group>;
};

export default Comp;
