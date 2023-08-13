import { HeartOutlined, FormOutlined } from "@ant-design/icons";

const demo = {
  label: "示例",
  key: "demo",
  icon: <HeartOutlined />,
  redirect: "/demo/form/base",
  children: [
    {
      label: "表单",
      key: "form",
      icon: <FormOutlined />,
      children: [
        {
          label: "基础",
          key: "base",
        },
        {
          label: "选择器",
          key: "select",
        },
        {
          label: "日期时间",
          key: "datetime",
        },
        {
          label: "表单联动",
          key: "linkage",
        },
        {
          label: "上传",
          key: "upload",
        },
        {
          label: "自定义表单",
          key: "custom",
        },
        {
          label: "筛选表单",
          key: "filter",
        },
        {
          label: "弹窗表单",
          key: "modal",
        },
      ],
    },
  ],
};

export default demo;
