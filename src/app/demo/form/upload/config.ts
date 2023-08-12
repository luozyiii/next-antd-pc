const fields: any[] = [
  {
    type: "upload",
    label: "上传",
    name: "upload",
    cProps: {
      maxCount: 2,
      multiple: true,
    },
    rules: [
      {
        required: true,
        validator: (_: any, value: any[]) => {
          if (value.length > 0) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("请上传图片!"));
        },
      },
    ],
  },
];

export default fields;
