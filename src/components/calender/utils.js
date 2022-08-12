export function getDateObj(dateString) {
  if (dateString) {
    if (dateString.indexOf("-") > -1) {
      const [year, month, day] = dateString.split("-");
      return {
        year,
        month: parseInt(month) - 1,
        day: parseInt(day),
      };
    } else if (dateString.indexOf("/") > -1) {
      const [year, month, day] = dateString.split("/");
      return {
        year,
        month: parseInt(month) - 1,
        day: parseInt(day),
      };
    }
  } else {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return {
      year,
      month,
      day,
    };
  }
}

export function getDate(dateString) {
  const { year, month } = getDateObj(dateString);
  return new Date(year, month, 0).getDate();
}

export function getDay(dateString) {
  const { year, month } = getDateObj(dateString);
  return new Date(year, month, 1).getDay();
}

export function copy(arr) {
  const newArr = [];
  arr.forEach((item) => {
    newArr.push(item);
  });
  return newArr;
}

export function zeroFill(value) {
  return value > 9 ? value : "0" + value;
}
