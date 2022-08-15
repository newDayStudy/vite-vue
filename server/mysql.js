const mysql = require("mysql");

module.exports = (query, callback) => {
  const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "123456",
    database: "testdb",
  });

  connection.connect();

  connection.query(query, (error, results, fields) => {
    callback(error, results);
  });

  connection.end();
  return connection;
};
