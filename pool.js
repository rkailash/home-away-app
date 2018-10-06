const mysql = require("mysql");
const pool = mysql.createPool({
  connectionLimit: 100,
  port: "3306",
  host: "localhost",
  user: "root",
  password: "",
  database: "homeaway"
});

pool.getConnection(err => {
  if (err) {
    console.log("pool.getConnection failed with error");
    throw err;
    res.writeHead(400, {
      "Content-Type": "text/plain"
    });
    res.end("Could not get connection object!");
  } else {
    console.log("Database connection successful");
  }
});

module.exports = pool;
