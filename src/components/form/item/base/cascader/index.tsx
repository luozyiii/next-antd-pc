import { useCallback, useEffect, useState } from 'react';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';

type CustomeCascaderProps = CascaderProps & {
  fetch?: (params?: object) => Promise<any>;
  fetchParams?: object;
  responseHandler?: (res: any) => any;
};

const Comp = ({ options, fetch, fetchParams, responseHandler = (res: any) => res, ...other }: CustomeCascaderProps) => {
  const [ops, setOps] = useState<any[]>([]);

  const getOptions = useCallback(async () => {
    try {
      if (fetch) {
        const res = responseHandler(await fetch({ ...fetchParams }));
        setOps(res);
      } else {
        setOps(options || []);
      }
    } finally {
      /* empty */
    }
  }, [fetch, fetchParams, options, responseHandler]);

  useEffect(() => {
    getOptions();
  }, [getOptions]);

  return <Cascader options={ops} {...other} />;
};

export default Comp;
