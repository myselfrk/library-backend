const pagination = require("../helpers/pagination");
const request = require("../helpers/request");
const response = require("../helpers/response");
const Book = require("../models/book");
const Student = require("../models/student");

exports.list = function (req, res) {
  const query = request.getFilteringOptions(req, ["branch"]);
  const { search = "", book_id } = request.getFilteringOptions(req, [
    "search",
    "book_id",
  ]);

  const options = {
    ...request.getRequestOptions(req),
    populate: [
      { path: "branch", select: ["_id", "branch_name"] },
      {
        path: "issued_books",
        select: ["_id", "book_name"],
      },
    ],
    sort: { full_name: 1 },
  };

  Student.paginate(
    {
      ...query,
      ...(book_id ? { issued_books: book_id } : null),
      soft_deleted: { $ne: true },
      full_name: { $regex: new RegExp(search), $options: "i" },
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
      { path: "issued_books", select: ["_id", "book_name"] },
    ])
    .exec(function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      if (!data) return response.sendNotFound(res);
      response.sendCreated(res, {
        data,
        message: "Student successfully fetched.",
      });
    });
};

exports.create = function (req, res) {
  const { full_name, branch, email } = req.body;

  Student.find({ email: email }, function (err, data) {
    if (err) return response.sendBadRequest(res, err);
    if (data.length)
      return response.sendBadRequest(
        res,
        "Student with this email already exist."
      );

    const student = new Student({ full_name, branch, email });
    student.save(function (err, data) {
      if (err) return response.sendBadRequest(res, err);
      response.sendCreated(res, {
        data,
        message: "Student successfully added.",
      });
    });
  });
};

exports.update = function (req, res) {
  const { full_name, branch } = req.body;
  Student.findOneAndUpdate(
    { _id: req.params.id },
    { full_name, branch },
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

exports.issueBook = function (req, res) {
  Student.findById({ _id: req.params.id }, function (err, data) {
    if (err) return response.sendBadRequest(res, err);

    const allIssuedBook = data.issued_books.map((obj) => obj.valueOf());

    const toIssue = req.body.issued_books.filter(
      (id) => !allIssuedBook.includes(id)
    );

    const submitedBook = allIssuedBook.filter(
      (id) => !req.body.issued_books.includes(id)
    );

    console.log(toIssue, submitedBook);

    res.send("");
  });
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
