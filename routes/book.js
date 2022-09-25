const express = require("express");
const book = require("../controllers/book");

const routes = express.Router({ mergeParams: true });

routes.route("/").get(book.list).post(book.create);
routes.route("/:id").get(book.getOne).put(book.update).delete(book.delete);

module.exports = routes;
