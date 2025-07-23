const fields: Array<{
  type: string;
  label: string;
  name: string;
  cProps?: Record<string, unknown>;
}> = [
  {
    type: 'input',
    label: '筛选项一',
    name: 'name1',
  },
  {
    type: 'input',
    label: '筛选项二',
    name: 'name2',
  },
];

export { fields };
