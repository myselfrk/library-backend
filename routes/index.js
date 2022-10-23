const express = require("express");
const routes = express.Router();
const branch = require("./branch");
const book = require("./book");
const student = require("./student");

routes.use("/branch", branch).use("/book", book).use("/student", student);

module.exports = routes;
