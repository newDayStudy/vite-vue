const express = require("express");
const db = require("./mysql");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const question = require("../data/question.json");
const topic = require("../data/topic.json");
// 是否开启服务，有数据库
const startServer = require("./startServer");
router.get("/getQuestion", (req, res) => {
  startServer
    ? db("SELECT id, title FROM question_table", (err, data) => {
        if (err) {
          res.json({
            code: 500,
            message: "获取问题出错了",
          });
        } else {
          res.json({
            code: 200,
            data,
            message: "ok",
          });
        }
      })
    : res.json({
        code: 200,
        data: question,
        message: "ok",
      });
});

router.post("/addQuestion", (req, res) => {
  let _sort = 1;
  let _type = 1;
  const { title, publisher, sort, type } = req.body;
  _sort = sort || _sort;
  _type = type || _type;
  db(
    `INSERT INTO question_table (title, sort, publisher, type) values ('${title}', ${_sort}, '${publisher}', ${_type})`,
    (err, data) => {
      if (err) {
        res.json({
          code: 500,
          message: "插入问题出错了",
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

router.post("/addAnswer", (req, res) => {
  let _sort = 1;
  let _score = 0;
  const { title, publisher, score, sort, question_id } = req.body;
  _sort = sort || _sort;
  _score = score || _score;
  db(
    `INSERT INTO answer_table (title, publisher, score, sort, question_id) values ('${title}', '${publisher}', ${_score}, ${_sort}, ${question_id})`,
    (err, data) => {
      if (err) {
        res.json({
          code: 500,
          message: "插入选项出错了",
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

router.get("/getTopic", (req, res) => {
  startServer
    ? db("SELECT * FROM question_table", (eq, qes) => {
        if (eq) {
          res.json({
            code: "500",
            message: "获取问题出错了",
          });
        } else {
          db("SELECT * FROM answer_table", (ea, ans) => {
            if (ea) {
              res.json({
                code: "500",
                message: "获取选项出错了",
              });
            } else {
              const data = qes.map((item) => {
                item.children = ans.filter((a) => a.question_id == item.id);
                return item;
              });
              res.json({
                code: 200,
                data,
                message: "ok",
              });
            }
          });
        }
      })
    : res.json({
        code: 200,
        data: topic,
        message: "ok",
      });
});
router.post("/answer", (req, res) => {
  const { content } = req.body;
  db(`SELECT * from user_answer_table WHERE user_id=1`, (e, d) => {
    if (e) {
      res.json({
        code: 500,
        data: null,
        message: "Interval Server Error",
      });
    } else {
      if (!d.length) {
        db(
          `INSERT INTO user_answer_table (user_id, content) values (1, '${content}')`,
          (err, data) => {
            if (err) {
              console.log(err);
              res.json({
                code: 500,
                data: null,
                message: "Interval server error",
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
      } else {
        res.json({
          code: 200,
          data: null,
          message: "不能重复答题！",
        });
      }
    }
  });
});
module.exports = router;
