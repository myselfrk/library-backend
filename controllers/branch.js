const mongoose = require("mongoose");
const Joi = require("joi");
const pagination = require("../helpers/pagination");
const request = require("../helpers/request");
const response = require("../helpers/response");
const Branch = require("../models/branch");

/**
 * @swagger
 * components:
 *   schemas:
 *     branch:
 *       type: object
 */

exports.list = function (req, res) {
  Branch.paginate({}, request.getRequestOptions(req), function (err, data) {
    if (err) return response.sendNotFound(res);
    pagination.setPaginationHeaders(res, data);
    response.sendCreated(res, { data, message: "Branchs successfully fetched" });
  });
};

exports.create = function (req, res) {
  const branch = new Branch(req.body);
  branch.save(function (err, data) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, { data, message: "Branch successfully added." });
  });
};

exports.update = function (req, res) {
  Branch.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, { data, message: "Branch successfully updated." });
    }
  );
};

exports.delete = function (req, res) {
  Branch.remove({ _id: req.params.id }, function (err,data) {
    if (err) return response.sendNotFound(res);
    if(data.deletedCount)
    response.sendCreated(res,{ message: "Branch successfully deleted." });
    else 
    response.sendCreated(res,{ message: "Branch doesn't exist or already has been deleted." });
  });
};
