const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./mysql");
const questionRouter = require("./questionRouter");
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

app.use("/", questionRouter);

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

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为", host, port);
});
