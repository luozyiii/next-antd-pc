import { Input } from 'antd';
import type { TextAreaProps } from 'antd/es/input/TextArea';
const { TextArea } = Input;

const Comp = (props: TextAreaProps) => {
  return <TextArea {...props} />;
};

export default Comp;
