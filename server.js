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
var serveStatic = require("serve-static");
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
      res.end("Email not found. Please sign up!");
    } else {
      console.log("SQL result", result);
      // bcrypt.compare(password, result[0].password, (err, hash) => {
      //   console.log("Inside compare..");
      //   if (err) throw err;
      //   if (hash == true) {
      //     console.log("hash is true");
      //     res.cookie("user_cookie", result[0].userid, {
      //       maxAge: 900000,
      //       httpOnly: false,
      //       path: "/"
      //     });
      //     req.session.userid = result[0].userid;
      //     res.writeHead(200, {
      //       "Content-Type": "application/json"
      //     });
      //     res.end(JSON.stringify(result[0]));
      //   } else {
      //     console.log("Passwords don't match");
      //   }
      // });
      res.cookie("user_cookie", result[0].userid, {
        maxAge: 900000,
        httpOnly: false,
        path: "/"
      });
      req.session.userid = result[0].userid;
      res.writeHead(200, {
        "Content-Type": "application/json"
      });
      res.end(JSON.stringify(result[0]));
    }
  });
});

app.get("/Logout", (req, res) => {
  if (req.session) {
    req.session.destroy(function(err) {
      if (err) {
        return res.end("Unable to logout");
      } else {
        return res.end("Logout Successful");
      }
    });
  }
});

app.post("/Register", (request, response) => {
  console.log("Inside Register POST request");
  let email = request.body.email;
  let password = request.body.password;
  let firstName = request.body.firstName;
  let lastName = request.body.lastName;
  let sql1 = "SELECT * from `users` WHERE `email`= ?";
  let sql2 =
    "INSERT INTO users (`userid`,`lastname`, `firstname`, `email`, `password`) VALUES (NULL,?,?,?,?)";
  pool.query(sql1, [email], (dbError, isUser) => {
    if (dbError) throw dbError;
    else {
      console.log("Check if email already exists. If no continue..");
      if (isUser.length === 0) {
        pool.query(
          sql2,
          [lastName, firstName, email, password],
          (err, result) => {
            if (err) {
              console.log("Unable to create user");
              throw err;
              response.writeHead(400, {
                "Content-Type": "text/plain"
              });
              response.end("Unable to create user");
            } else {
              console.log("User creation successful");
              response.writeHead(200, {
                "Content-Type": "application/json"
              });
              response.end(JSON.stringify(result));
            }
          }
        );
      } else {
        response.writeHead(400, {
          "Content-Type": "text/plain"
        });
        response.end("Email already exists. Please sign in");
      }
    }
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
    "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,'san jose')";
  pool.query(
    sql,
    [ownerId, name, sleeps, bathrooms, bedrooms, type, price],
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
  console.log(req.query);
  let location = req.query.location;
  let sql = "SELECT * FROM `property` WHERE `location` = san jose";
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
  console.log("Inside Property Results Page");
  let location = req.query.location;
  let startdate = req.query.startDate;
  let enddate = req.query.endDate;
  console.log("Request body:", location);
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
      console.log("Result:", result);
    }
  });
});

app.get("/Property/:id", (req, res) => {
  let propertyId = req.params.id;
  console.log("Inside Property Page of ID:", propertyId);
  let sql = "SELECT * from `property` where `propertyid`= ?";
  pool.query(sql, [propertyId], (err, result) => {
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
      console.log("Result is:", result);
    }
  });
});

app.get("/Trips", (req, res) => {
  let userId = req.session.userid;
  let sql = "SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?";
  
  console.log("Traveller dashboard");
  pool.query(sql, [userId], (err, result) => {
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
      console.log("Trips result is", result);
    }
  });
});

app.get("/OwnerDash", (req, res) => {
  let ownerId = req.session.userid;
  let sql = "SELECT * FROM `property` WHERE ownerid = ?";
  pool.query(sql, [ownerId], (err, result) => {
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

app.post("/Property", (req, res) => {
  let sql1 = "UPDATE ";
  let sql2 =
    "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,'san jose')";
});

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

app.post("/Booking", (req, res) => {
  console.log("Inside booking:", req.body);

  let startDate = req.body.startdate;
  let endDate = req.body.enddate;
  let propertyId = req.body.propertyid;
  let userId = req.session.userid;
  console.log('Booking made by User ID:', userId)
  let sql1 = "SELECT ownerid FROM property WHERE propertyid =?";
  let sql2 =
    "INSERT INTO booking (`bookingid`,`propertyid`,`userid`,`ownerid`,`startdate`, `enddate`) VALUES (NULL,?,?,?,?,?)";
  let sql3 = "UPDATE property SET bookedflag=1 WHERE propertyid=?";
  pool.query(sql1, [propertyId], (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log(result[0].ownerid);
      let OWNERID = result[0].ownerid;
      pool.query(
        sql2,
        [propertyId, userId, OWNERID, startDate, endDate],
        (err, result1) => {
          if (err) throw err;
          else {
            console.log("Booking Successful", result1);
            pool.query(sql3, [propertyId], (err, result2) => {
              if (err) throw err;
              else {
                res.end("Bookng Successful");
              };
            });
          }
        }
      );
    }
  });
});

//start your server on port 3001
app.use(serveStatic(path.join(__dirname, "images")));
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});

// ("SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.ownerid=?")
