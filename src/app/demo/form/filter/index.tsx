'use client';

import React, { useCallback } from 'react';
import { Tag } from 'antd';
import { FilterForm, PageContent, PageTable, TableColumn } from '@/components';
import { useTable } from '@/hooks';
import { columns, fields } from './config';
import type { PaginatedResponse, PaginationParams, RecordType } from '@/types';

interface ListItem extends RecordType {
  a: string;
  b: string;
  c: string;
}

const FilterFormPage: React.FC = () => {
  const getList = useCallback(
    ({ page, pageSize }: PaginationParams & RecordType): Promise<PaginatedResponse<ListItem>> => {
      return new Promise((resolve) => {
        const list: ListItem[] = Array(pageSize)
          .fill(0)
          .map((_, i) => {
            const num = (page - 1) * pageSize + i + 1;
            return {
              a: 'a' + num,
              b: 'b' + num,
              c: 'c' + num,
            };
          });
        setTimeout(() => {
          resolve({
            total: 201,
            list: list,
            page,
            pageSize,
          });
        }, 1000);
      });
    },
    [],
  );

  const [tableProps, onSearch, onReset] = useTable<ListItem>({
    fetch: getList,
  });

  return (
    <PageContent>
      <FilterForm fields={fields} defaultExpand onSearch={onSearch} onReset={onReset} />
      <PageTable<ListItem> {...tableProps} columns={columns} rowKey="a">
        <TableColumn key="a">
          {(params: ListItem & { index: number }) => (
            <>
              <Tag color="red">热情</Tag>
              {params.a}
            </>
          )}
        </TableColumn>
      </PageTable>
    </PageContent>
  );
};

export default FilterFormPage;
