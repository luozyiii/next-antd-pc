import { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface CustomeSelectProps extends SelectProps {
  fetch?: (params?: object) => Promise<unknown>;
  fetchParams?: object;
  responseHandler?: (res: unknown) => Array<Record<string, unknown>>;
}

// 实现重点： 数据源异步加载
const Comp = ({
  options,
  fetch,
  fetchParams,
  responseHandler = (res: unknown) => res as Array<Record<string, unknown>>,
  ...other
}: CustomeSelectProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ops, setOps] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getOptions = useCallback(async () => {
    try {
      setLoading(true);
      if (fetch) {
        const res = await fetch({ ...fetchParams });
        setOps(responseHandler(res));
      } else {
        setOps(options || []);
      }
    } finally {
      setLoading(false);
    }
  }, [fetch, fetchParams, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return <Select loading={loading} {...other} options={ops} />;
};

export default Comp;
