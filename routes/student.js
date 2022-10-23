const express = require("express");
const student = require("../controllers/student");

const routes = express.Router({ mergeParams: true });

routes.route("/").get(student.list).post(student.create);
routes
  .route("/:id")
  .get(student.getOne)
  .put(student.update)
  .delete(student.delete);

module.exports = routes;
