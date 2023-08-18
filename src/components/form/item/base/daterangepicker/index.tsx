import { useCallback, useMemo } from 'react';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import { DatePicker, ConfigProvider } from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { Dayjs } from 'dayjs';

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

  return (
    <ConfigProvider locale={zhCN}>
      <RangePicker {...other} value={_v} onChange={handleOnChange} />
    </ConfigProvider>
  );
};

export default Comp;
