import Cascader from "./base/cascader";
import Checkbox from "./base/checkbox";
import DatePicker from "./base/datepicker";
import DateRangePicker from "./base/daterangepicker";
import Input from "./base/input";
import Number from "./base/number";
import Password from "./base/password";
import Radio from "./base/radio";
import Select from "./base/select";
import Switch from "./base/switch";
import TextArea from "./base/textarea";
import TimePicker from "./base/timepicker";
import TimeRangePicker from "./base/timerangepicker";
import TreeSelect from "./base/treeselect";
import Upload from "./base/upload";
import PriceUnit from "./custom/price-unit";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  input: Input,
  number: Number,
  password: Password,
  textarea: TextArea,
  radio: Radio,
  select: Select,
  treeselect: TreeSelect,
  checkbox: Checkbox,
  switch: Switch,
  datepicker: DatePicker,
  daterangepicker: DateRangePicker,
  timepicker: TimePicker,
  timerangepicker: TimeRangePicker,
  cascader: Cascader,
  upload: Upload,
  // 自定义组件
  priceUnit: PriceUnit, // object
};
