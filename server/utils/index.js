const moment = require("moment");

function getDate(date = new Date()) {
  return moment(date).format("YYYY-MM-DD hh:mm:ss");
}

function handleDeep(data) {
  const newArr = [...data];
  const length = newArr.length;
  const values = [];
  for (const k of newArr) {
    k.children = [];
    for (const j of newArr) {
      if (k.id == j.parent_id) {
        j.used = true;
        k.children.push(j);
      }
    }
    values.push(k);
  }
  return data.filter((item) => !item.used);
}
module.exports = {
  getDate,
  handleDeep,
};
