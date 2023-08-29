import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { TimePicker } from 'antd';
import type { TimePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

type valueOriginalProps = Dayjs | null;
type valueProps = string | undefined;

type CustomeDatePickerProps = Omit<TimePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};

// 实现重点： value入参、出参的一致性
const Comp = ({ value, onChange, format = 'HH:mm:ss', ...other }: CustomeDatePickerProps) => {
  const handleOnChange = useCallback(
    (date: valueOriginalProps) => {
      const v = date ? dayjs(date).format(format as string) : undefined;
      onChange?.(v);
    },
    [format, onChange],
  );

  const _v: valueOriginalProps = useMemo(() => {
    return value ? dayjs(value, format as string) : null;
  }, [format, value]);

  return <TimePicker {...other} format={format} value={_v} onChange={handleOnChange} />;
};

export default Comp;
