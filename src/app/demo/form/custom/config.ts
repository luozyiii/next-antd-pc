const checkPrice = (_: unknown, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error('至少大于零!'));
};

const fields: Array<{
  type: string;
  label: string;
  name: string;
  rules?: unknown[];
  cProps?: Record<string, unknown>;
}> = [
  {
    type: 'priceUnit',
    label: '价格',
    name: 'price',
    rules: [{ validator: checkPrice }],
  },
];

export default fields;
