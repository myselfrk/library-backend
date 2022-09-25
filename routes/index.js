const express = require("express");
const routes = express.Router();
const branch = require("./branch");
const book = require("./book");
const response = require("./../helpers/response");

routes.use(response.setHeadersForCORS);
routes.use("/branch", branch).use("/book",book);

module.exports = routes;
