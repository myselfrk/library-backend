const express = require("express");
const librarianAuth = require("../controllers/librarianAuth");

const routes = express.Router({ mergeParams: true });

routes.route("/signup").post(librarianAuth.create);

module.exports = routes;
