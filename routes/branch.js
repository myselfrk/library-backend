const express = require("express");
const branch = require("../controllers/branch");
const auth = require("./../middleware/auth");

const routes = express.Router({ mergeParams: true });

routes.use(auth).route("/").get(branch.list).post(branch.create);
routes.use(auth).route("/:id").put(branch.update).delete(branch.delete);

module.exports = routes;
