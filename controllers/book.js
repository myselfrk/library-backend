const mongoose = require("mongoose");
const Joi = require("joi");
const pagination = require("../helpers/pagination");
const request = require("../helpers/request");
const response = require("../helpers/response");
const Book = require("../models/book");

/**
 * @swagger
 * components:
 *   schemas:
 *     branch:
 *       type: object
 */

exports.list = function (req, res) {
  const query = request.getFilteringOptions(req, ["branch_id"]);
  const { search = "" } = request.getFilteringOptions(req, ["search"]);
  Book.paginate(
    {...query,book_name:{$regex: new RegExp(search), $options:"i"}},
    request.getRequestOptions(req),
    function (err, data) {
      if (err) return response.sendNotFound(res);
      pagination.setPaginationHeaders(res, data); 
      response.sendCreated(res, {
        data,
        message: "Books successfully fetched.",
      });
    }
  );
};

exports.getOne = function (req, res) {
  Book.find({ _id: req.params.id }, function (err, data) {
    if (err) return response.sendBadRequest(res, err);
    if(!data.length) return response.sendNotFound(res)
    response.sendCreated(res, { data, message: "Book successfully fetched." });
  });
};

exports.create = function (req, res) {
  const book = new Book(req.body);
  book.save(function (err, data) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, { data, message: "Book successfully added." });
  });
};

exports.update = function (req, res) {
  Book.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, {
        data,
        message: "Book successfully updated.",
      });
    }
  );
};

exports.delete = function (req, res) {
  Book.remove({ _id: req.params.id }, function (err) {
    if (err) return response.sendNotFound(res);
    response.sendCreated(res,{ message: "Book successfully deleted." });
  });
};
