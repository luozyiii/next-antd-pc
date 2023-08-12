const fields: any[] = [
  {
    type: "input",
    label: "姓名",
    name: "name",
    required: true,
  },
  {
    type: "select",
    label: "性别",
    name: "gender",
    rules: [{ required: true }],
    cProps: {
      options: [
        { value: "male", label: "男" },
        { value: "female", label: "女" },
        { value: "secrecy", label: "保密" },
      ],
    },
  },
  {
    type: "input",
    label: "备注",
    name: "remark",
    displayRules: [
      {
        name: "gender",
        value: ["secrecy"],
      },
    ],
    shouldUpdate: (prevValues: any, currentValues: any) =>
      prevValues.gender !== currentValues.gender,
    cProps: {},
  },
];

export default fields;
