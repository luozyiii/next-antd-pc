import Table from "./table";
import type { TableProps } from "antd";

/**
 * 定制table样式
 * border : 有边框
 * sticky : 设置粘性头部和滚动条
 */
const PageTable = ({ children, ...other }: TableProps<any>) => {
  return (
    <div
      className="pageTable"
      style={{ padding: "0 12px 12px 12px", backgroundColor: "#fff" }}
    >
      <Table bordered sticky {...other}>
        {children}
      </Table>
    </div>
  );
};

export default PageTable;
