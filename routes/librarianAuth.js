const express = require("express");
const librarianAuth = require("../controllers/librarianAuth");

const routes = express.Router({ mergeParams: true });

routes.route("/signup").post(librarianAuth.signup);
routes.route("/login").post(librarianAuth.login);

module.exports = routes;
