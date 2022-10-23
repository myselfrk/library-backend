const pagination = require("../helpers/pagination");
const request = require("../helpers/request");
const response = require("../helpers/response");
const Student = require("../models/student");

exports.list = function (req, res) {
  const query = request.getFilteringOptions(req, ["branch_id"]);
  const { search = "", book_id } = request.getFilteringOptions(req, [
    "search",
    "book_id",
  ]);
  const options = {
    ...request.getRequestOptions(req),
    populate: [
      { path: "branch", select: ["_id", "branch_name"] },
      { path: "book", select: ["_id", "book_name"] },
    ],
    sort: { full_name: -1 },
  };

  Student.paginate(
    {
      ...query,
      soft_deleted: { $ne: true },
      full_name: { $regex: new RegExp(search), $options: "i" },
      issued_books: { $in: book_id },
    },
    options,
    function (err, data) {
      if (err) return response.sendNotFound(res);
      pagination.setPaginationHeaders(res, data);
      response.sendCreated(res, {
        data,
        message: "Students successfully fetched.",
      });
    }
  );
};

exports.getOne = function (req, res) {
  Student.find({ _id: req.params.id }, ["-soft_deleted"])
    .populate([
      { path: "branch", select: ["_id", "branch_name"] },
      { path: "book", select: ["_id", "book_name"] },
    ])
    .exec(function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      if (!data.length) return response.sendNotFound(res);
      response.sendCreated(res, {
        data: data[0],
        message: "Student successfully fetched.",
      });
    });
};

exports.create = function (req, res) {
  const student = new Student(req.body);
  student.save(function (err, data) {
    if (err) return response.sendBadRequest(res, err);
    response.sendCreated(res, { data, message: "Student successfully added." });
  });
};

exports.update = function (req, res) {
  Student.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, {
        data,
        message: "Student successfully updated.",
      });
    }
  );
};

exports.delete = function (req, res) {
  Student.findOneAndUpdate(
    { _id: req.params.id },
    { soft_deleted: true },
    { new: true },
    function (err) {
      if (err) return response.sendNotFound(res);
      response.sendCreated(res, { message: "Student successfully removed." });
    }
  );
};
