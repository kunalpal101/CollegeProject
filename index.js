require("dotenv").config();

const cors = require("cors");

const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
const login = require("./Module/userModule");

const router = require("./Routers/routerMain");
app.use(router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    start_prg();
  })
  .catch((err) => {
    console.log(err);
  });

function start_prg() {
  const port = 8000;
  app.listen(port, () => {
    console.log("Listening on port: " + port);
  });

  app.get("/", (req, res) => {
    res.sendFile(__dirname + "/FrontEnd/index.html");
  });

  app.use(express.static(__dirname + "/FrontEnd"));
}

// api for login
// try {
//   app.post("/login", (req, res) => {
//     login
//       .findOne({ username: req.body.username })
//       .then((data) => {
//         if (data == null) {
//           res.send({ Auth: "Decline" });
//           console.log("Username not found");
//         } else if (data.password != req.body.password) {
//           console.log("Password Wrong");
//           res.send({ Auth: "Decline password" });
//         } else {
//           res.send({
//             Auth: "Success",
//             username: req.body.username,
//             password: req.body.password,
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   });
// } catch (err) {
//   console.log(err);
// }

// api for signup
try {
  app.post("/signup", (req, res) => {
    var ele = new login({
      username: req.body.username,
      password: req.body.password,
    });

    ele
      .save()
      .then(() => {
        res.send({ signup: "Successful" });
      })
      .catch((err) => {
        if (err.code == 11000) {
          console.log("Duplication error \n" + err);
          return res.status(400).send({ status: "duplicate-error" });
        }
        return res.send({ status: "Unknown-error" });
      });
  });
} catch (err) {
  console.log("Exception occured: \n", err);
}

// api for saving memory
try {
  app.post("/save", (req, res) => {
    var ele = {
      time: req.body.time,
      date: req.body.date,
      username: req.body.username,
      privacy: req.body.privacy,
      heading: req.body.heading,
      body: req.body.body,
    };

    login
      .findOneAndUpdate(
        { username: ele.username },
        {
          $push: {
            memoryList: [
              {
                memories: {
                  date: ele.date,
                  time: ele.time,
                  privacy: ele.privacy,
                  heading: ele.heading,
                  description: ele.body,
                },
              },
            ],
          },
        },
        { new: true }
      )
      .then((data) => {
        if (data != null) {
          console.log("Record Updated");
          res.send(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });
} catch (err) {
  console.log(err);
}

app.post("/fetchmem", (req, res) => {
  const val = req.body.username;
  console.log(req.body);

  login
    .findOne({ username: val })
    .then((data) => {
      if (data == null) res.sendStatus(404);
      else res.status(200).send(data.memoryList);
    })
    .catch((err) => {
      console.log(err);
    });
});
