const sqlstring = require("sqlstring");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
require("dotenv").config();

module.exports = {
  sos: async (req, res) => {
    let query = ""
    query = `select email from macDB;`;
    db.query(query, async (err, result) => {
      try {
        if (err) throw err;
        console.log(result.length);
        console.log(result[0]);
        for (let i = 0; i < result.length; i++) {
          if (result[i].length != 0) {
            var str = JSON.stringify(result[i]);
            str.replace("RowDataPacket", "");
            str = JSON.parse(str);
            console.log(str.email);
            var nodemailer = require('nodemailer');
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                user: `${process.env.email}`,
                pass: `${process.env.password}`
              }
            });
            await transporter.sendMail({
              from: 'satya.prakash9500@gmail.com',
              to: `${str.email}`,
              subject: 'SOS Alert!',
              text: 'I am in danger at https://www.google.com/maps/place/Auto+Cluster+Exhibition+Center/@18.6388445,73.7994321,17z/data=!3m1!4b1!4m5!3m4!1s0x3bc2b84992d04bbd:0x9f1c44fb853ba461!8m2!3d18.6388394!4d73.8016208'
            });




            //     // var unirest = require("unirest");

            //     // var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
            //     // //
            //     // req.query({
            //     //   "authorization": "YySFCubZzArG4ijh91VPIKTQk0EXg8aRN7qsOw2Lx3l6pfdDoWbnqjgXH5ztYk2c0xIV9m1KWQ3wEeU4",
            //     //   "sender_id": "FSTSMS",
            //     //   "message": "This is a test message",
            //     //   "language": "english",
            //     //   "route": "p",
            //     //   "numbers": `${str[0].phone}`,
            //     // });

            //     // req.headers({
            //     //   "cache-control": "no-cache"
            //     // });


            //     // req.end(function (res) {
            //     //   if (res.error) throw new Error(res.error);

            //     //   console.log(res.body);
            //     // });





          }
        }
      } catch (err) {
        console.log(err);
        res.end({ Message: false });
      }
    });



    res.send({ send: 'message sent!' });
  },
  register: async (req, res) => {
    //req.body.mac = await bcrypt.hash(req.body.mac, 8);
    const query = `insert into macDB (username,phone,email,mac,gps) values (${sqlstring.escape(req.body.username)},${sqlstring.escape(req.body.phone)},${sqlstring.escape(req.body.email)},${sqlstring.escape(req.body.mac)},${sqlstring.escape(req.body.gps)});
    insert into login (username,password) values (${sqlstring.escape(req.body.username)},${sqlstring.escape(req.body.username)});
    insert into emergency (username, emergencyContact) values(${ sqlstring.escape(req.body.username)}, ${sqlstring.escape(req.body.contact)})`;
    db.query(query, async (err, result) => {
      try {
        if (err) throw err;
        res.send({ registered: true });
      } catch (err) {
        console.log(err);
        res.send({ registered: false })
      }
    })
  },
  getPhone: async (req, res) => {
    let query = ""
    query = `select * from macDB;`;
    db.query(query, async (err, result) => {
      try {
        if (err) throw err;
        console.log(result)
        res.send({ phone: result });
      } catch (err) {
        console.log(err);
        res.end("Server Error");
      }//not this time
    })
  },
  getRelation: async (req, res) => {
    let query = ""
    query = `select * from emergency where username=${sqlstring.escape(req.body.username)};`;
    db.query(query, async (err, result) => {
      try {
        if (err) throw err;
        console.log(result)
        res.send({ emergency: result });
      } catch (err) {
        console.log(err);
        res.end("Server Error");
      }//not this time bye nh nh nhj bh safhg satya gh
    })
  },
  verifyPassword: async (req, res) => {
    let query = `select password from login where username=${sqlstring.escape(req.body.username)}`;
    db.query(query, (err, result) => {
      try {
        if (err) throw err;
        console.log(result[0].password);
        var dbpswd = result[0].password;
        if (dbpswd == req.body.password) { res.send({ login: req.body.username }); }
        else {
          throw "false"
        }//not
      } catch (err) {
        console.log(err);
        res.send({ login: false });
      }//not
    })
  }
};
