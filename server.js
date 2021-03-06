const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

var serveStatic = require("serve-static");

//MongoDB connection
const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Models
const UserModel = require("./models/User");
const PropModel = require("./models/Property");

let owner = new UserModel({
  _id: new mongoose.Types.ObjectId(),
  email: "kailash@kailash.com",
  password: "admin"
});
owner.save(err => {
  console.log(err);
});
let doc = new PropModel({
  _id: new mongoose.Types.ObjectId(),
  name: "Greate place to live",
  owner: owner._id,
  sleeps: 5,
  bathrooms: 3,
  bedrooms: 3,
  type: "Cottage",
  price: 350,
  location: "San Jose"
});
doc.save(err => {
  console.log(err);
});

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

//Multer
const multer = require("multer");
const uuidv4 = require("uuid/v4");
const fs = require("fs");
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
  console.log("Inside Login request");
  UserModel.findOne({ email: req.body.email })

    .catch(err => {
      res.code = "400";
      res.value =
        "The email and password you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
      res.sendStatus(400).end();
    })

    .then(user => {
      if (user && user.password == req.body.password) {
        res.code = "200";
        res.value = user;
        res.cookie("user_cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        res.sendStatus(200).end();
        console.log("Login succesful");
      } else {
        console.log("Passwords don't match");
      }
    });
});

//

// app.get("/Logout", (req, res) => {
//   console.log("Inside logout request");
//   if (req.session) {
//     req.session.destroy(function(err) {
//       if (err) {
//         return res.end("Unable to logout");
//       } else {
//         console.log("User logged out!");
//         return res.end("Logout Successful!");
//       }
//     });
//   }
// });

app.post("/Register", (request, response) => {
  console.log("Inside Register request");
  let User = new Users({
    email: request.body.email,
    password: request.body.password
  });

  User.save().then(
    user => {
      console.log("User created : ", user);
      response.sendStatus(200).end();
    },
    err => {
      console.log("Error Creating User");
      response.sendStatus(400).end();
    }
  );
});

// app.post("/Owner", (req, res) => {
//   console.log("Inside Owner POST request");
//   let ownerId = req.session.userid;
//   let name = req.body.details.headline;
//   let sleeps = req.body.details.accomodates;
//   let bathrooms = req.body.details.bathrooms;
//   let bedrooms = req.body.details.bedrooms;
//   let type = req.body.details.type;
//   let price = req.body.price;
//   let location = req.body.location;
//   let sql =
//     "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,'san jose')";
//   pool.query(
//     sql,
//     [ownerId, name, sleeps, bathrooms, bedrooms, type, price],
//     (err, result) => {
//       if (err) {
//         console.log("Unable post property");
//         throw err;
//         res.writeHead(400, {
//           "Content-Type": "text/plain"
//         });
//         res.end("Unable to create property");
//       } else {
//         console.log("Property created successful", result);
//         res.writeHead(200, {
//           "Content-Type": "application/json"
//         });
//         res.end(JSON.stringify(result));
//       }
//     }
//   );
// });

// app.post("/UpdateUser", (req, res) => {
//   console.log("Inside Update User", req.body);
//   let firstName = req.body.firstname;
//   let lastName = req.body.lastname;
//   let location = req.body.location;
//   let userId = req.session.userid;

//   let sql = "UPDATE users SET firstname=?,lastname=?,location=? WHERE userid=?";
//   pool.query(sql, [firstName, lastName, location, userId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No results returned");
//     } else {
//       console.log(`User ${userId} has been updated`);
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//     }
//   });
// });

app.get("/Home", (req, res) => {
  console.log(req.query);

  PropModel.find({ location: req.query.location })

    .then(properties => {
      res.code = "200";
      res.send({ properties });
    })

    .catch(error => {
      res.code = "400";
      res.send = error;
    });
});

// app.get("/PropertyList", (req, res) => {
//   console.log("Inside Property Results Page");
//   let location = req.query.location;
//   let startdate = req.query.startDate;
//   let enddate = req.query.endDate;
//   console.log("Request body:", location);
//   let sql = "SELECT * FROM `property` WHERE `location` = ?";
//   pool.query(sql, [location], (err, result) => {
//     console.log("SQL query", sql);
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//       console.log("Result:", result);
//     }
//   });
// });

// app.get("/Property/:id", (req, res) => {
//   let propertyId = req.params.id;
//   console.log("Inside Property Page of ID:", propertyId);
//   let sql = "SELECT * from `property` where `propertyid`= ?";
//   pool.query(sql, [propertyId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//       console.log("Result is:", result);
//     }
//   });
// });

// app.get("/Trips", (req, res) => {
//   let userId = req.session.userid;
//   let sql =
//     "SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?";
//   //let sql =
//   //"SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.userid=?";

//   console.log("Traveller dashboard");
//   pool.query(sql, [userId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       res.end(JSON.stringify(result));
//       console.log("Trips result is", result);
//     }
//   });
// });

// app.get("/OwnerDash", (req, res) => {
//   let ownerId = req.session.userid;
//   let sql = "SELECT * FROM `property` WHERE ownerid = ?";
//   console.log("Fetching Owner Dashboard of Owner ID", ownerId);
//   pool.query(sql, [ownerId], (err, result) => {
//     if (err) {
//       throw err;
//       res.writeHead(400, {
//         "Content-Type": "text/plain"
//       });
//       res.end("No search results returned");
//     } else {
//       res.writeHead(200, {
//         "Content-Type": "application/json"
//       });
//       console.log("Result is ", result);
//       res.end(JSON.stringify(result));
//     }
//   });
// });

// app.post("/Property", (req, res) => {
//   let sql1 = "UPDATE ";
//   let sql2 =
//     "INSERT INTO property (`propertyid`,`ownerid`,`name`, `sleeps`, `bathrooms`, `bedrooms`,`type`,`price`,`location`) VALUES (NULL,?,?,?,?,?,?,?,'san jose')";
// });

// app.post("/Photos", upload.single("selectedFile"), (req, res) => {
//   if (!req.file) {
//     console.log("No file received");
//     res.send({
//       success: false
//     });
//   } else {
//     console.log("File received!", res.file);
//     res.send();
//   }
// });

// app.post("/Booking", (req, res) => {
//   console.log("Inside booking:", req.body);

//   let startDate = req.body.startdate;
//   let endDate = req.body.enddate;
//   let propertyId = req.body.propertyid;
//   let userId = req.session.userid;
//   console.log("Booking made by User ID:", userId);
//   let sql1 = "SELECT ownerid FROM property WHERE propertyid =?";
//   let sql2 =
//     "INSERT INTO booking (`bookingid`,`propertyid`,`userid`,`ownerid`,`startdate`, `enddate`) VALUES (NULL,?,?,?,?,?)";
//   let sql3 = "UPDATE property SET bookedflag=1 WHERE propertyid=?";
//   pool.query(sql1, [propertyId], (err, result) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log(result[0].ownerid);
//       let OWNERID = result[0].ownerid;
//       pool.query(
//         sql2,
//         [propertyId, userId, OWNERID, startDate, endDate],
//         (err, result1) => {
//           if (err) throw err;
//           else {
//             console.log("Booking Successful", result1);
//             pool.query(sql3, [propertyId], (err, result2) => {
//               if (err) throw err;
//               else {
//                 res.end("Bookng Successful");
//               }
//             });
//           }
//         }
//       );
//     }
//   });
// });

//start your server on port 3001
app.use(serveStatic(path.join(__dirname, "images")));
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});

// ("SELECT property.*,booking.startdate,booking.enddate FROM property LEFT JOIN booking ON property.propertyid=booking.propertyid WHERE booking.ownerid=?")
