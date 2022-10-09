const express = require("express");
const routes = express.Router();
const branch = require("./branch");
const book = require("./book");

routes.use("/branch", branch).use("/book",book);

module.exports = routes;
