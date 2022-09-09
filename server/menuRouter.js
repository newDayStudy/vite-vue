const express = require("express");
const db = require("./mysql");
const router = express.Router();

router.get("/getMenus", (req, res) => {
  db(`SELECT * FROM menu_table`, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: "Internal Server Error",
      });
    } else {
      console.log("menus", data);
      res.json({
        code: 200,
        data: {
          records: [],
        },
        message: "ok",
      });
    }
  });
});
router.post("/addMenu", (req, res) => {
  const { name, icon, path, parent_id, user_id, filepath } = req.body;
  db(
    `INSERT INTO menu_table (name, icon, path, parent_id, user_id, filepath) values ('${name}', '${icon}', '${path}', ${parent_id}, ${user_id}, ${filepath})`,
    (err, data) => {
      if (err) {
        res.json({
          code: 500,
          message: "Interval Server Error",
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
router.post("/updateMenu", (req, res) => {
  const { name, icon, path, parent_id, token, filepath } = req.body;
  db(
    `UPDATE menu_table SET name=${name}, icon=${icon}, path=${path}, parent_id=${parent_id},filepath=${filepath} WHERE token=${token}`,
    (err, data) => {
      if (err) {
        res.json({
          code: 500,
          message: "Interval Server Error",
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
router.post("/deleteMenu", (req, res) => {
  const { id } = req.body;
  db(`DELETE FROM menu_table WHERE id=${id}`, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: "Interval Server Error",
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
