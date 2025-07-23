import { useCallback, useEffect, useState } from 'react';
import { Cascader } from 'antd';
import type { CascaderProps } from 'antd';

type CustomeCascaderProps = Omit<CascaderProps, 'options'> & {
  options?: Array<Record<string, unknown>>;
  fetch?: (params?: object) => Promise<unknown>;
  fetchParams?: object;
  responseHandler?: (res: unknown) => Array<Record<string, unknown>>;
};

const Comp = ({
  options,
  fetch,
  fetchParams,
  responseHandler = (res: unknown) => res as Array<Record<string, unknown>>,
  ...other
}: CustomeCascaderProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Cascader options={ops} {...(other as any)} />;
};

export default Comp;
