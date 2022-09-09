const jwt = require("jsonwebtoken");
const secret = "haha";

function setToken(params) {
  return jwt.sign(params, secret);
}
function getToken(token) {
  return jwt.verify(token, secret);
}

module.exports = {
  setToken,
  getToken,
};
