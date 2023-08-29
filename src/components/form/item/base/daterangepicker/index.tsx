import { useCallback, useMemo } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

const { RangePicker } = DatePicker;

type valueOriginalProps = [Dayjs | null, Dayjs | null] | null;
type valueProps = (string | null)[] | undefined;

type CustomeRangePickerProps = Omit<RangePickerProps, 'value' | 'onChange'> & {
  value?: valueProps;
  onChange?: (value: valueProps) => void;
};

// 实现重点： value入参、出参的一致性
const Comp = ({ value, onChange, format = 'YYYY-MM-DD HH:mm:ss', ...other }: CustomeRangePickerProps) => {
  const handleOnChange = useCallback(
    (dates: valueOriginalProps) => {
      const v =
        dates && dates.length
          ? dates?.map((date) => {
              return date ? dayjs(date).format(format as string) : null;
            })
          : undefined;
      onChange?.(v);
    },
    [format, onChange],
  );

  const _v: valueOriginalProps | any = useMemo(() => {
    return value && value.length
      ? value.map((v) => {
          return v ? dayjs(v) : null;
        })
      : null;
  }, [value]);

  return <RangePicker {...other} value={_v} onChange={handleOnChange} />;
};

export default Comp;
