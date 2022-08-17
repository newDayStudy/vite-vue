const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const questionRouter = require("./questionRouter");
const articleRouter = require("./articleRouter");

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
app.use("/", articleRouter);

const server = app.listen(8081, () => {
  const host = server.address().address;
  const port = server.address().port;

  console.log("应用实例，访问地址为", host, port);
});
