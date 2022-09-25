const express = require("express");
const branch = require("../controllers/branch");

const routes = express.Router({ mergeParams: true });

routes.route("/").get(branch.list).post(branch.create);
routes.route("/:id").put(branch.update).delete(branch.delete);

module.exports = routes;
