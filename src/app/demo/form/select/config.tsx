const getOptions = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: 10,
            name: '张三',
            sub: [
              {
                id: 101,
                name: 'hi',
              },
              {
                id: 102,
                name: 'hi2',
              },
            ],
          },
          { id: 11, name: '李四' },
        ],
      });
    }, 3000);
  });
};

interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];

const treeData = [
  {
    value: 'parent 1',
    title: 'parent 1',
    children: [
      {
        value: 'parent 1-0',
        title: 'parent 1-0',
        children: [
          {
            value: 'leaf1',
            title: 'leaf1',
          },
          {
            value: 'leaf2',
            title: 'leaf2',
          },
        ],
      },
      {
        value: 'parent 1-1',
        title: 'parent 1-1',
        children: [
          {
            value: 'leaf3',
            title: <b style={{ color: '#08c' }}>leaf3</b>,
          },
        ],
      },
    ],
  },
];

const fields: Array<{
  type: string;
  label: string;
  name: string;
  shouldUpdate?: boolean;
  cProps?: Record<string, unknown>;
}> = [
  {
    type: 'radio',
    label: '单选框',
    name: 'radio',
    // rules: [{ required: true, message: '请选择!' }],
    shouldUpdate: true,
    cProps: {
      // direction: 'vertical',
      options: [
        { value: 'A', label: '选项A' },
        { value: 'B', label: '选项B' },
      ],
    },
  },
  {
    type: 'radio',
    label: '单选框(异步)',
    name: 'radio2',
    // rules: [{ required: true, message: '请选择!' }],
    cProps: {
      fetch: getOptions,
      fetchParams: { role: 'ROLEA' },
      responseHandler: (res: { data: unknown }) => res.data,
      fieldNames: { label: 'name', value: 'id' },
    },
  },
  {
    type: 'checkbox',
    label: '复选框',
    name: 'checkbox',
    cProps: {
      options: [
        { value: 'HuaWei', label: 'HuaWei' },
        { value: 'Apple', label: 'Apple' },
      ],
    },
  },
  {
    type: 'checkbox',
    label: '复选框(异步)',
    name: 'checkbox2',
    cProps: {
      fetch: getOptions,
      fetchParams: { role: 'ROLEA' },
      responseHandler: (res: { data: unknown }) => res.data,
      fieldNames: { label: 'name', value: 'id' },
    },
  },
  {
    type: 'select',
    label: '选择器',
    name: 'select',
    // rules: [{ required: true, message: '请选择!' }],
    cProps: {
      placeholder: '请选择',
      options: [
        { value: 'A', label: '选项A' },
        { value: 'B', label: '选项B' },
      ],
    },
  },
  {
    type: 'select',
    label: '异步select',
    name: 'asyncSelect',
    // rules: [{ required: true, message: '请选择!' }],
    cProps: {
      fetch: getOptions,
      fetchParams: { role: 'ROLEA' },
      responseHandler: (res: { data: unknown }) => res.data,
      fieldNames: { label: 'name', value: 'id' },
      placeholder: '请选择xxxxxx',
    },
  },
  {
    type: 'cascader',
    label: '级联选择',
    name: 'cascader',
    // rules: [{ required: true, message: '请选择!' }],
    cProps: {
      placeholder: '请选择',
      options: options,
    },
  },
  {
    type: 'cascader',
    label: '级联选择(异步)',
    name: 'asyncCascader',
    // rules: [{ required: true, message: '请选择!' }],
    cProps: {
      fetch: getOptions,
      fetchParams: { role: 'ROLEA' },
      responseHandler: (res: { data: unknown }) => res.data,
      fieldNames: { label: 'name', value: 'id', children: 'sub' },
      placeholder: '请选择xxxxxx',
    },
  },
  {
    type: 'treeselect',
    label: '树选择',
    name: 'treeselect',
    cProps: {
      treeData: treeData,
      style: { width: '200px' },
    },
  },
];

export default fields;
