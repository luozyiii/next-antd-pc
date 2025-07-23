const fields: Array<{
  type: string;
  label: string;
  name: string;
  rules?: unknown[];
  cProps?: Record<string, unknown>;
}> = [
  {
    type: 'upload',
    label: '上传',
    name: 'upload',
    cProps: {
      maxCount: 2,
      multiple: true,
    },
    rules: [
      {
        required: true,
        validator: (_: unknown, value: unknown[]) => {
          if (value.length > 0) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('请上传图片!'));
        },
      },
    ],
  },
];

export default fields;
