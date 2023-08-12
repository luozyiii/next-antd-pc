import { TreeSelect } from 'antd';
import type { TreeSelectProps } from 'antd';

// TreeSelect 异步场景
// 1. 异步一次性加载
// 2. 先加载父节点，子节点异步加载
const Comp = (props: TreeSelectProps) => {
  return <TreeSelect {...props} />;
};

export default Comp;
