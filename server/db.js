const mysql = require("mysql");

exports.db = () => {
  // connect mysql
  const con = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root",
    database: "nokadb",
  });
  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!");
  });
  return con;
};
