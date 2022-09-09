const express = require("express");
const db = require("./mysql");
const router = express.Router();
const { getDate } = require("./utils");
const { getToken, setToken } = require("./utils/secret");
router.get("/getRoles", (req, res) => {
  db("SELECT * FROM user_role_table", (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: "Internal Server Error",
      });
    } else {
      res.json({
        code: 200,
        data,
        message: "ok",
      });
    }
  });
});
router.post("/getUsers", (req, res) => {
  console.log(req.body);
  const { pageSize, current } = req.body;
  const offset = (current - 1) * pageSize;
  db("SELECT count(*) as total FROM user_table", (err, d) => {
    console.log("err", err);
    if (err) {
      res.json({
        code: 500,
        message: "Internal Server Error",
      });
    } else {
      const { total } = d[0];
      db(`SELECT * FROM user_table limit ${offset}, ${pageSize}`, (e, data) => {
        console.log("e", e);
        if (e) {
          res.json({
            code: 500,
            message: "Internal Server Error",
          });
        } else {
          res.json({
            code: 200,
            data: {
              records: data,
              total,
              current,
              pageSize,
            },
            message: "ok",
          });
        }
      });
    }
  });
});
router.post("/addUser", (req, res) => {
  const { username, password, roleId, roleName, telephone } = req.body;
  const create_time = getDate();
  const update_time = getDate();
  const token = setToken({ username, password });
  db(
    `INSERT INTO user_table (username, password, roleId, roleName, telephone, create_time, update_time, token) values ('${username}', '${password}', ${roleId}, '${roleName}', ${telephone}, '${create_time}', '${update_time}', '${token}')`,
    (err, data) => {
      console.log(err);
      if (err) {
        res.json({
          code: 500,
          message: "Internal Server Error",
        });
      } else {
        res.json({
          code: 200,
          data: null,
          message: "ok",
        });
      }
    }
  );
});
router.post("/updateUser", (req, res) => {
  const { token, roleId, roleName, telephone } = req.body;
  const update_time = getDate();
  db(
    `UPDATE user_table SET roleId = ${roleId}, roleName = ${roleName}, telephone=${telephone}, update_time=${update_time} WHEHE token=${token}`,
    (err, data) => {
      if (err) {
        res.json({
          code: 500,
          message: "Internal Server Error",
        });
      } else {
        res.json({
          code: 200,
          data: null,
          message: "ok",
        });
      }
    }
  );
});
router.post("/deleteUser", (req, res) => {
  const { id } = req.body;
  db(`DELETE FROM user_table WHEHE id=${id}`, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: "Internal Server Error",
      });
    } else {
      res.json({
        code: 200,
        data: null,
        message: "ok",
      });
    }
  });
});
module.exports = router;
