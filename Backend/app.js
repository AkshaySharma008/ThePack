const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const session = require("express-session");
const db = require("./database/db_config");
const cors = require("cors");
const path = require("path");
const {
  sos,
  register,
  getPhone,
  getRelation,
  verifyPassword
} = require("./routes/login");
require("dotenv").config();

process.on('uncaughtException', function (err) {
  console.log('### BIG ONE (%s)', err);
});

const app = express();
//
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.post("/sos", sos);
app.post("/register", register)
app.post("/phone", getPhone)
app.post("/emergency", getRelation)
app.post("/verify", verifyPassword)

app.get("/", (req, res) => {
  res.send({ main: 'reach' })
});

app.post("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port: ${process.env.PORT}`);
});
