const mongoose = require("mongoose");
const pagination = require("../helpers/pagination");
const request = require("../helpers/request");
const response = require("../helpers/response");
const Book = require("../models/book");

exports.list = function (req, res) {
  const query = request.getFilteringOptions(req, ["branch"]);
  const { search = "" } = request.getFilteringOptions(req, ["search"]);
  const options = {
    ...request.getRequestOptions(req),
    populate: { path: "branch", select: ["_id", "branch_name"] },
    sort: { created_at: -1 },
    select: ["-soft_deleted"],
  };

  Book.paginate(
    {
      ...query,
      soft_deleted: { $ne: true },

      book_name: { $regex: new RegExp(search), $options: "i" },
    },
    options,
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
  Book.find({ _id: req.params.id }, ["-soft_deleted"])
    .populate({ path: "branch", select: ["_id", "branch_name"] })
    .exec(function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      if (!data.length) return response.sendNotFound(res);
      response.sendCreated(res, {
        data: data[0],
        message: "Book successfully fetched.",
      });
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
  Book.findOneAndUpdate(
    { _id: req.params.id },
    { soft_deleted: true },
    { new: true },
    function (err) {
      if (err) return response.sendNotFound(res);
      response.sendCreated(res, { message: "Book successfully deleted." });
    }
  );
};
