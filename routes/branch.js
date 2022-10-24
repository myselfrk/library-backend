const express = require("express");
const branch = require("../controllers/branch");
const auth = require("./../middleware/auth");

const routes = express.Router({ mergeParams: true });

routes.route("/").get(branch.list).post(auth, branch.create);
routes.use(auth).route("/:id").put(branch.update).delete(branch.delete);

module.exports = routes;
