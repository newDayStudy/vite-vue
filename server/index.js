const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./mysql");
const { titleProps } = require("ant-design-vue/lib/typography/Title");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("*", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (res.method === "OPTIONS") res.send(200);
  next();
});
app.post("/getArticleList", (req, res) => {
  const { pageSize, current } = req.body;
  const offset = (current - 1) * pageSize;
  db(`SELECT count(*) as total FROM article_table`, (err, data) => {
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
              res.json({
                code: 200,
                data: {
                  records: data1.map((item) => {
                    item.publisher_name = roleMap[item.publisher_id];
                    return item;
                  }),
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
  });
});
app.post("/deleteArticle", (req, res) => {
  const { id } = req.body;
  db(`DELETE FROM article_table WHERE id = ${id}`, (err, data) => {
    if (err) {
      console.log(err);
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

app.get("/getQuestion", (req, res) => {
  db("SELECT id, title FROM question_table", (err, data) => {
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
  });
});

app.post("/addQuestion", (req, res) => {
  let _sort = 1;
  const { title, publisher, sort } = req.body;
  _sort = sort || _sort;
  db(
    `INSERT INTO question_table (title, sort, publisher) values ('${title}', ${_sort}, '${publisher}')`,
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

app.post("/addAnswer", (req, res) => {
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

app.get("/getTopic", (req, res) => {
  db("SELECT * FROM question_table", (eq, qes) => {
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
  });
});

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为", host, port);
});
