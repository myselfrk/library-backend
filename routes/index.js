const express = require("express");
const routes = express.Router();
const branch = require("./branch");
const book = require("./book");
const student = require("./student");
const librarianAuth = require("./librarianAuth");

routes
  .use("/branch", branch)
  .use("/book", book)
  .use("/student", student)
  .use("/librarian", librarianAuth);

module.exports = routes;
