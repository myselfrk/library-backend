const express = require('express');
const routes  = express.Router();
const branch = require("./branch")

routes.use('/branch',branch);

module.exports = routes;