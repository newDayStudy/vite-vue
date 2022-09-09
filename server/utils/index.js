const moment = require("moment");

function getDate(date = new Date()) {
  return moment(date).format("YYYY-MM-DD hh:mm:ss");
}

module.exports = {
  getDate,
};
