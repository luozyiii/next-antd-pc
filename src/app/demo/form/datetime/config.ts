const fields: any[] = [
  {
    type: "datepicker",
    label: "日期",
    name: "day",
    cProps: {
      // format: 'YYYY-MM-DD',
      showTime: true,
    },
  },
  {
    type: "datepicker",
    label: "日期(周)",
    name: "week",
    cProps: {
      picker: "week",
    },
  },
  {
    type: "datepicker",
    label: "日期(月份)",
    name: "month",
    cProps: {
      picker: "month",
    },
  },
  {
    type: "datepicker",
    label: "日期(季度)",
    name: "quarter",
    cProps: {
      picker: "quarter",
    },
  },
  {
    type: "datepicker",
    label: "日期(年)",
    name: "year",
    cProps: {
      picker: "year",
    },
  },
  {
    type: "daterangepicker",
    label: "日期范围",
    name: "dayrange",
    cProps: {
      // format: 'YYYY-MM-DD',
      showTime: true,
    },
  },
  {
    type: "daterangepicker",
    label: "日期范围(周)",
    name: "weekrange",
    cProps: {
      picker: "week",
    },
  },
  {
    type: "daterangepicker",
    label: "日期范围(月份)",
    name: "monthrange",
    cProps: {
      picker: "month",
    },
  },
  {
    type: "daterangepicker",
    label: "日期范围(季度)",
    name: "quarterrange",
    cProps: {
      picker: "quarter",
    },
  },
  {
    type: "daterangepicker",
    label: "日期范围(年)",
    name: "yearrange",
    cProps: {
      picker: "year",
    },
  },
  {
    type: "timepicker",
    label: "时间",
    name: "time",
  },
  {
    type: "timepicker",
    label: "时间2",
    name: "time2",
    cProps: {
      format: "HH:mm",
    },
  },
  {
    type: "timerangepicker",
    label: "时间范围",
    name: "timerange",
  },
  {
    type: "timerangepicker",
    label: "时间范围2",
    name: "timerange2",
    cProps: {
      format: "HH:mm",
      minuteStep: 15,
    },
  },
];

export default fields;
