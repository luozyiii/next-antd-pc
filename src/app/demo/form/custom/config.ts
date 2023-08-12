const checkPrice = (_: any, value: { number: number }) => {
  if (value.number > 0) {
    return Promise.resolve();
  }
  return Promise.reject(new Error("至少大于零!"));
};

const fields: any[] = [
  {
    type: "priceUnit",
    label: "价格",
    name: "price",
    rules: [{ validator: checkPrice }],
  },
];

export default fields;
