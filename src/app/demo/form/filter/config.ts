const fields: any[] = [
  {
    type: "input",
    label: "筛选项一",
    name: "name1",
  },
  {
    type: "select",
    label: "筛选项二",
    name: "name2",
    cProps: {
      options: [
        { label: "A", value: "A" },
        { label: "B", value: "B" },
      ],
    },
  },
  {
    type: "input",
    label: "筛选项三",
    name: "name3",
  },
  {
    type: "input",
    label: "筛选项四",
    name: "name4",
  },
  {
    type: "input",
    label: "筛选项五",
    name: "name5",
  },
  {
    type: "input",
    label: "筛选项六",
    name: "name6",
  },
  {
    type: "input",
    label: "筛选项七",
    name: "name7",
  },
  {
    type: "daterangepicker",
    label: "筛选项八",
    name: "name8",
    colType: "large",
    cProps: {
      // format: 'YYYY-MM-DD',
      showTime: true,
    },
  },
  {
    type: "daterangepicker",
    label: "筛选项九",
    name: "name9",
    colType: "large",
    cProps: {
      // format: 'YYYY-MM-DD',
      showTime: true,
    },
  },
  {
    type: "daterangepicker",
    label: "筛选项十",
    name: "name10",
    colType: "large",
    cProps: {
      // format: 'YYYY-MM-DD',
      showTime: true,
    },
  },
];

const columns = [
  { title: "字段一", key: "a", width: 260 },
  { title: "字段二", key: "b" },
  { title: "字段三", key: "c" },
];

export { fields, columns };
