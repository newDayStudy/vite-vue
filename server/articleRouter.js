const express = require("express");
const db = require("./mysql");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const articleList = require("../data/articleList.json");
const startServer = require("./startServer");
router.post("/getArticleList", (req, res) => {
  const { pageSize, current } = req.body;
  const offset = (current - 1) * pageSize;
  startServer
    ? db(`SELECT count(*) as total FROM article_table`, (err, data) => {
        if (err) {
          res.json({
            data: 500,
            message: "总数量出错了",
          });
        } else {
          const { total } = data[0];
          db(
            `SELECT * FROM article_table limit ${offset}, ${pageSize}`,
            (err1, data1) => {
              if (err1) {
                res.json({
                  code: 500,
                  message: "出错了",
                });
                return;
              }
              db("SELECT id, name FROM USER_ROLE_TABLE", (e, d) => {
                if (e) {
                  res.json({
                    code: 500,
                    message: "获取权限出错了",
                  });
                } else {
                  const roleMap = {};
                  d.forEach((item) => {
                    roleMap[item.id] = item.name;
                  });
                  const records = data1.map((item) => {
                    item.publisher_name = roleMap[item.publisher_id];
                    return item;
                  });
                  // fs.writeFile(path.resolve(__dirname, '../data/articleList.json'), JSON.stringify(records), ['utf-8'], (err, data) => {})
                  res.json({
                    code: 200,
                    data: {
                      records,
                      total,
                      current,
                    },
                    message: "ok",
                  });
                }
              });
            }
          );
        }
      })
    : res.json({
        code: 200,
        data: {
          records: articleList,
          total: 5,
          current,
        },
        message: "ok",
      });
});

router.post("/deleteArticle", (req, res) => {
  const { id } = req.body;
  db(`DELETE FROM article_table WHERE id in (${id})`, (err, data) => {
    if (err) {
      res.json({
        code: 500,
        message: "出错了",
      });
    } else {
      res.json({
        code: 200,
        message: "ok",
      });
    }
  });
});

router.post("/updateArticle", (req, res) => {
  const { id, title, sub_title, content } = req.body;
  db(
    `UPDATE article_table SET title='${title}', sub_title='${sub_title}', content='${content}' WHERE id=${id}`,
    (err, data) => {
      console.log(err);
      if (err) {
        res.json({
          code: 500,
          message: "更新出错了",
        });
      } else {
        res.json({
          code: 200,
          message: "ok",
        });
      }
    }
  );
});

module.exports = router;
