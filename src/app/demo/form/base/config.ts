const fields: any[] = [
  {
    type: "input",
    label: "手机",
    name: "phone",
    rules: [{ required: true, message: "请输入您的手机号!" }],
    cProps: {
      maxLength: 11,
      placeholder: "请输入",
      // size: 'small',
      addonBefore: "+86",
      allowClear: true,
      // addonAfter: 'hi',
      // disabled: true,
    },
    extra: "我是提示信息！",
  },
  {
    type: "number",
    label: "数字",
    name: "number",
    cProps: {
      min: 1,
      max: 10,
    },
  },
  {
    type: "password",
    label: "密码",
    name: "pwd",
    rules: [{ required: true, message: "请输入您的密码!" }],
    cProps: {
      // visibilityToggle: false,
    },
  },
  {
    type: "password",
    label: "确认密码",
    name: "confirm",
    dependencies: ["pwd"],
    rules: [
      {
        required: true,
        message: "请确认您的密码!",
      },
      ({ getFieldValue }: any) => ({
        validator(_: any, value: any) {
          if (!value || getFieldValue("pwd") === value) {
            return Promise.resolve();
          }
          return Promise.reject(new Error("两个密码不一致!"));
        },
      }),
    ],
  },
  {
    type: "textarea",
    label: "文本域",
    name: "textarea",
    rules: [{ required: true, message: "请输入!" }],
    cProps: {
      showCount: true,
      maxLength: 100,
      // autoSize: true,
      autoSize: { minRows: 3, maxRows: 5 },
    },
  },

  {
    type: "switch",
    label: "开关",
    name: "switch",
  },
];

export default fields;
