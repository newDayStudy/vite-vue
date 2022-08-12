export function getDateObj(dateString) {
  if (dateString) {
    if (dateString.indexOf("-") > -1) {
      const [year, month, day] = dateString.split("-");
      return {
        year,
        month: parseInt(month),
        day: parseInt(day),
      };
    } else if (dateString.indexOf("/") > -1) {
      const [year, month, day] = dateString.split("/");
      return {
        year,
        month: parseInt(month),
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

// 获取当前日期
export function getCurrentDate(dateString) {
  const { year, month, day } = getDateObj(dateString);
  return year + "-" + zeroFill(month) + "-" + zeroFill(day);
}

// 获取当前月总共多少天
export function getDate(dateString) {
  const { year, month } = getDateObj(dateString);
  return new Date(year, month, 0).getDate();
}

// 获取当前月第一天是周几
export function getDay(dateString) {
  const { year, month } = getDateObj(dateString);
  return new Date(year, month - 1, 1).getDay();
}

export function copy(arr) {
  const newArr = [];
  arr.forEach((item) => {
    newArr.push(item);
  });
  return newArr;
}

// 日期填充补0
export function zeroFill(value) {
  return value > 9 ? value : "0" + value;
}
