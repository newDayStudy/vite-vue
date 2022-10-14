const express = require("express");
const db = require("./mysql");
const router = express.Router();
const fs = require("fs");
const pathNode = require("path");
const startServer = require("./startServer");
const { getDate, handleDeep } = require("./utils");
const menus = require("../data/menus.json");
router.get("/getMenus", (req, res) => {
  db(`SELECT * FROM menu_table`, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: "Internal Server Error",
      });
    } else {
      res.json({
        code: 200,
        data: {
          records: handleDeep(data),
        },
        message: "ok",
      });
    }
  });
});
router.post("/addMenu", (req, res) => {
  const { name, icon, path, parent_id, user_id, filepath, sort, code } =
    req.body;
  const parentId = parent_id || 0;
  const userId = user_id || 1;
  const create_time = getDate();
  const update_time = getDate();
  db(
    `INSERT INTO menu_table (name, icon, path, parent_id, user_id, filepath, sort, create_time, update_time, code) values ('${name}', '${icon}', '${path}', ${parentId}, ${userId}, '${filepath}', ${sort}, '${create_time}', '${update_time}', '${code}')`,
    (err, data) => {
      console.log(err);
      if (err) {
        res.json({
          code: 500,
          message: "Interval Server Error",
        });
      } else {
        fs.writeFile(
          pathNode.resolve(__dirname, `../src/views/${filepath}.vue`),
          `
<script setup>

</script>

<template>
  <a-layout class="a-layout">
    <a-card>
    ${filepath}
    </a-card>
  </a-layout>
</template>

<style lang="scss" scoped>

.a-layout {
  overflow-y: auto;
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
}

</style>
        `,
          (e, d) => {
            if (e) {
              console.log("创建失败", e);
            } else {
              console.log("创建成功");
            }
          }
        );
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
router.post("/getMenuByUserId", (req, res) => {
  const userId = req.body.id;
  startServer
    ? db(`SELECT * FROM menu_table WHERE user_id=${userId}`, (err, data) => {
        console.log(err);
        if (err) {
          res.json({
            code: 500,
            message: "Internal Server Error",
          });
        } else {
          // fs.writeFile(path.resolve(__dirname, '../data/menus.json'), JSON.stringify(data), ['utf-8'], (err, data) => {})
          res.json({
            code: 200,
            data: handleDeep(data),
            message: "ok",
          });
        }
      })
    : res.json({
        code: 200,
        data: handleDeep(menus),
        message: "ok",
      });
});
module.exports = router;
