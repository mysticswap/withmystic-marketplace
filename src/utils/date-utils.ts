export const addHours = (hours: number) => {
  return getEndTime(hours, "hours");
};

export const addDays = (days: number) => {
  return getEndTime(days, "days");
};

export const addMonths = (months: number) => {
  return getEndTime(months, "months");
};

export const getEndTime = (value: number, unit: string) => {
  const date = new Date();
  switch (unit) {
    case "hours":
      date.setHours(date.getHours() + value);
      break;
    case "days":
      date.setDate(date.getDay() + value);
      break;
    case "months":
      date.setMonth(date.getMonth() + value);
      break;
    default:
      break;
  }
  return Math.floor(date.getTime() / 1000);
};
