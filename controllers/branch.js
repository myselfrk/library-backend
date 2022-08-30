const mongoose = require("mongoose");
const Joi = require('joi');
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
    Branch.paginate({}, request.getRequestOptions(req), function (err, result) {
        if (err) return response.sendNotFound(res);
        pagination.setPaginationHeaders(res, result);
        res.json(result);
    });
}

exports.create = function (req, res) {
    const branch = new Branch(req.body);
    branch.save(function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        response.sendCreated(res, branch);

    });
}

exports.update = function (req, res) {
    Branch.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, function (err, item) {
        if (err) return response.sendBadRequest(res, err);
        res.json(item);
    });
}

exports.delete = function (req, res) {
    Branch.remove({ _id: req.params.id }, function (err, item) {
        if (err) return response.sendNotFound(res);
        res.json({ message: 'Item successfully deleted' });
    });
}