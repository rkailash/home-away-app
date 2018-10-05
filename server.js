const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const pool = require("./pool");
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const path = require("path");
const mysql = require("mysql");
const fs = require("fs");
const bcrypt = require("bcrypt");
const saltRounds = 10;

app.set("view engine", "ejs");

app.use(
  session({
    secret: "cmpe273_kafka_passport_mongo",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000
  })
);

app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const folderName = "./uploads";
    cb(null, folderName);
  },
  filename: (req, file, cb) => {
    const newFilename = `${req.session.userid}-${
      file.originalname
    }${path.extname(file.originalname)}`;
    console.log("file extension");
    cb(null, newFilename);
  }
});

const upload = multer({ storage });

//Allow Access Control
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.post("/Login", (req, res) => {
  console.log("Inside Login POST request");
  let email = req.body.email;
  let password = req.body.password;
  let sql = "SELECT * FROM `users` WHERE `email` = ?";
  pool.query(sql, [email], (err, result) => {
    if (err) {
      console.log("Email not found in database");
      throw err;
      res.writeHead(404, {
        "Content-Type": "text/plain"
      });
      res.end("Email not found!");
    } else {
      console.log("SQL result", result);
      bcrypt.compare(password, result[0].password, (err, hash) => {
        console.log("Inside compare..");
        if (err) throw err;
        if (hash == true) {
          console.log("hash is true");
          res.cookie("user_cookie", "admin", {
            maxAge: 900000,
            httpOnly: false,
            path: "/"
          });
          req.session.userid = result[0].userid;
          res.writeHead(200, {
            "Content-Type": "text/plain"
          });
          res.end("Successful Login");
        } else {
          console.log("Passwords don't match");
        }
      });
    }
  });
});

app.post("/Register", (req, res) => {
  console.log("Inside Register POST request");
  let email = req.body.email;
  let password = req.body.password;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let sql =
    "INSERT INTO users (`userid`,`lastname`, `firstname`, `email`, `password`) VALUES (NULL,?,?,?,?)";

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    password = hash;
    pool.query(sql, [lastName, firstName, email, password], (err, result) => {
      if (err) {
        console.log("Unable to create user");
        throw err;
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Unable to create user");
      } else {
        console.log("User creation successful");
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    });
  });
});

app.post("/Owner", (req, res) => {
  console.log("Inside Owner POST request");
  let ownerId = req.session.userid;
  let name = req.body.headline;
  let sleeps = req.body.sleeps;
  let bathrooms = req.body.bathrooms;
  let bedrooms = req.body.bedrooms;
  let type = req.body.type;
  let price = req.body.price;
  let location = req.body.location;
  let sql =
    "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,?)";
  pool.query(
    sql,
    [ownerId, name, sleeps, bathrooms, bedrooms, type, price, location],
    (err, result) => {
      if (err) {
        console.log("Unable post property");
        throw err;
        res.writeHead(400, {
          "Content-Type": "text/plain"
        });
        res.end("Unable to create property");
      } else {
        console.log("Property created successful", result);
        res.writeHead(200, {
          "Content-Type": "application/json"
        });
        res.end(JSON.stringify(result));
      }
    }
  );
});

app.get("/Home", (req, res) => {
  let location = req.body.location;
  let sql = "SELECT * FROM `property` WHERE `location` = ?";
  pool.query(sql, location, (err, result) => {
    if (err) {
      throw err;
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("No search results returned");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
    }
  });
});

app.get("/PropertyList", (req, res) => {
  console.log("Property Details");
  let location = req.query.location;
  console.log("Request body:", req.query.location);
  let sql = "SELECT * FROM `property` WHERE `location` = ?";
  pool.query(sql, [location], (err, result) => {
    console.log("SQL query", sql);
    if (err) {
      throw err;
      res.writeHead(400, {
        "Content-Type": "text/plain"
      });
      res.end("No search results returned");
    } else {
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result));
      console.log(result);
    }
  });
});

app.get("/ProductDetails", (req, res) => {
  console.log("ProductPage");
});

app.get("/TDash", (req, res) => {
  console.log("Traveller dashboard");
});

app.get("/OwnerDash", (req, res) => {});
app.post("/Photos", upload.single("selectedFile"), (req, res) => {
  if (!req.file) {
    console.log("No file received");
    res.send({
      success: false
    });
  } else {
    console.log("File received!", res.file);
    res.send();
  }
});

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
