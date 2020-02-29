const mysql = require("mysql");
require("dotenv").config();
try {
  const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    multipleStatements: true
  });

  db.connect(err => {
    if (err) {
      throw err;
    }
    console.log("Connected to database");
  });

  db.on('error', function (err) {
    console.log(err);
  })
  global.db = db;
} catch (err) {
  console.log(err);
}

