import { useCallback, useMemo } from 'react';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { DatePicker, ConfigProvider } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

type valueOriginalProps = Dayjs | null;
type valueProps = string | undefined;

// TODO: 临时 any，后续有时间再看
type CustomeDatePickerProps = Omit<DatePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};

// 实现重点： value入参、出参的一致性
const Comp = ({ value, onChange, format = 'YYYY-MM-DD HH:mm:ss', ...other }: any) => {
  const handleOnChange = useCallback(
    (date: valueOriginalProps) => {
      const v = date ? dayjs(date).format(format as string) : undefined;
      onChange?.(v);
    },
    [format, onChange],
  );

  const _v: valueOriginalProps = useMemo(() => {
    return value ? dayjs(value, format as string) : null;
  }, [value, format]);

  return (
    <ConfigProvider locale={zhCN}>
      <DatePicker {...other} value={_v} onChange={handleOnChange} />
    </ConfigProvider>
  );
};

export default Comp;
