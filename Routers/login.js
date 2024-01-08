const express = require("express");
const app = express();

const login = require("../Module/userModule");

// api for login
try {
  app.post("/login", (req, res) => {
    login
      .findOne({ username: req.body.username })
      .then((data) => {
        if (data == null) {
          res.send({ Auth: "Decline" });
          console.log("Username not found");
        } else if (data.password != req.body.password) {
          console.log("Password Wrong");
          res.send({ Auth: "Decline password" });
        } else {
          res.send({
            Auth: "Success",
            username: req.body.username,
            password: req.body.password,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
} catch (err) {
  console.log(err);
}

module.exports = app;
