const express = require("express");
const student = require("../controllers/student");
const auth = require("./../middleware/auth");

const routes = express.Router({ mergeParams: true });

routes.route("/").get(student.list).post(auth, student.create);
routes
  .route("/:id")
  .get(student.getOne)
  .put(auth, student.update)
  .delete(auth, student.delete);

module.exports = routes;
