import { Input } from 'antd';
import type { PasswordProps } from 'antd/es/input/Password';
const { Password } = Input;

const Comp = (props: PasswordProps) => {
  return <Password {...props} />;
};

export default Comp;
