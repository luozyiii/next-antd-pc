import { Children, cloneElement, isValidElement, useMemo } from 'react';
import { Table } from 'antd';
import type { RecordType } from '@/types';
import type { TableProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface TableColumnProps<T = RecordType> {
  children?: (params: T & { index: number }) => React.ReactNode;
  [key: string]: unknown;
}

export const TableColumn = <T extends RecordType = RecordType>({ children, ...params }: TableColumnProps<T>) => {
  return (children ? children(params as T & { index: number }) : null) ?? '-';
};

interface CustomTableProps<T = RecordType> extends Omit<TableProps<T>, 'columns'> {
  columns?: ColumnsType<T>;
}

const Comp = <T extends RecordType = RecordType>({ columns, children, ...other }: CustomTableProps<T>) => {
  const cols = useMemo(() => {
    const childMap: Record<string, React.ReactElement> = {};
    Children.forEach(children, (child) => {
      if (child && isValidElement(child) && child.key != null) {
        childMap[String(child.key)] = child;
      }
    });

    return columns?.map((item) => {
      const { key, ...other } = item;
      const col = { ...other, key: key, dataIndex: key };

      const keyStr = String(key);
      const ChildComp = childMap[keyStr];

      if (ChildComp && ChildComp.type === TableColumn) {
        col.render = (text: unknown, record: T, index: number) => cloneElement(ChildComp, { ...record, index });
      } else {
        col.render = (text: unknown) => text ?? '-';
      }

      return col;
    });
  }, [children, columns]);

  return <Table size="small" {...other} columns={cols as ColumnsType<T>} />;
};

export default Comp;
