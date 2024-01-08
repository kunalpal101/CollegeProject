const express = require("express");
const app = express();

const login = require("./login");

app.use(login);

module.exports = app;
