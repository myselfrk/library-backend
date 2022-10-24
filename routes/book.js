const express = require("express");
const book = require("../controllers/book");
const auth = require("./../middleware/auth");

const routes = express.Router({ mergeParams: true });

routes.route("/").get(book.list).post(auth, book.create);
routes
  .route("/:id")
  .get(book.getOne)
  .put(auth, book.update)
  .delete(auth, book.delete);

module.exports = routes;
