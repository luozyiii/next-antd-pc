"use client";

import React, { useCallback } from "react";
import { Tag } from "antd";
import { PageContent, FilterForm, PageTable, TableColumn } from "@/components";
import { useTable } from "@/hooks";
import { fields, columns } from "./config";

const FilterFormPage: React.FC = () => {
  const getList = useCallback(({ page, pageSize }: any) => {
    return new Promise((resolve) => {
      const list = Array(pageSize)
        .fill(0)
        .map((_, i) => {
          const num = (page - 1) * pageSize + i + 1;
          return {
            a: "a" + num,
            b: "b" + num,
            c: "c" + num,
          };
        });
      setTimeout(() => {
        resolve({
          total: 201,
          list: list,
        });
      }, 1000);
    });
  }, []);

  const [tableProps, onSearch, onReset] = useTable({
    fetch: getList,
  });

  return (
    <PageContent>
      <FilterForm
        fields={fields}
        defaultExpand
        onSearch={onSearch}
        onReset={onReset}
      />
      <PageTable {...tableProps} columns={columns} rowKey="a">
        <TableColumn key="a">
          {({ a }: any) => (
            <>
              <Tag color="red">热情</Tag>
              {a}
            </>
          )}
        </TableColumn>
      </PageTable>
    </PageContent>
  );
};

export default FilterFormPage;
