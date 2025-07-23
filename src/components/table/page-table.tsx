import Table from './table';
import type { RecordType } from '@/types';
import type { TableProps } from 'antd';

/**
 * 定制table样式
 * border : 有边框
 * sticky : 设置粘性头部和滚动条
 */
const PageTable = <T extends RecordType = RecordType>({ children, ...other }: TableProps<T>) => {
  return (
    <div className="pageTable">
      <Table bordered sticky {...other}>
        {children}
      </Table>
    </div>
  );
};

export default PageTable;
