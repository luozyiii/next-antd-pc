import { useMemo, Children, isValidElement, cloneElement } from "react";
import type { Key } from "react";
import { Table, ConfigProvider } from "antd";
import type { TableProps } from "antd";
import zhCN from "antd/locale/zh_CN";

export const TableColumn: React.FC<any> = ({ children, ...params }: any) => {
  return (children ? children(params) : null) ?? "-";
};

const Comp = ({ columns, children, ...other }: TableProps<any>) => {
  const cols = useMemo(() => {
    const childMap: any = {};
    Children.forEach(children, (child) => {
      if (child && isValidElement(child)) {
        childMap[child.key as Key] = child;
      }
    });

    return columns?.map((item: any) => {
      const { key, ...other } = item;
      const col = {
        ...other,
        key: key,
        dataIndex: key,
      };

      const ChildComp = childMap[key];

      if (ChildComp && ChildComp.type === TableColumn) {
        col.render = (...params: any[]) =>
          cloneElement(ChildComp, { ...params[1], index: params[2] });
      } else {
        col.render = (text: string | number) => text ?? "-";
      }

      return col;
    });
  }, [children, columns]);

  return (
    <ConfigProvider locale={zhCN}>
      <Table size="small" {...other} columns={cols} />
    </ConfigProvider>
  );
};

export default Comp;
