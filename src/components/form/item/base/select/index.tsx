import { useCallback, useEffect, useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

interface CustomeSelectProps extends SelectProps {
  fetch?: (params?: object) => Promise<any>;
  fetchParams?: object;
  responseHandler?: (res: any) => any;
}

// 实现重点： 数据源异步加载
const Comp = ({ options, fetch, fetchParams, responseHandler = (res: any) => res, ...other }: CustomeSelectProps) => {
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
