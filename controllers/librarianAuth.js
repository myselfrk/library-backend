const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Librarian = require("../models/librarian");
const response = require("../helpers/response");

exports.signup = function (req, res) {
  const { password, email, full_name } = req.body;

  Librarian.find({ email }, function (err, data) {
    if (data.length || err) {
      return response.sendBadRequest(res, err || "User already exist.");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const librarian = new Librarian({
        password: hashedPassword,
        email,
        full_name,
      });
      librarian.save(function (err, data) {
        if (err) return response.sendBadRequest(res, err);
        response.sendCreated(res, { data, message: "Signup successfully" });
      });
    }
  });
};

exports.login = function (req, res) {
  Librarian.find({ email: req.body.email }, function (err, data) {
    if (!data.length || err) {
      return response.sendBadRequest(res, err || "Invalid email or password");
    } else {
      const { password, email, full_name, _id } = data[0];

      const isSame = bcrypt.compareSync(req.body.password, password);

      if (!isSame) {
        return response.sendBadRequest(res, "Invalid email or password");
      } else {
        const token = jwt.sign({ email, full_name }, config.key.privateKey, {
          expiresIn: "24h",
        });

        Librarian.findByIdAndUpdate(
          { _id },
          { last_login: new Date() },
          function (err) {
            if (err) {
              return response.sendBadRequest(
                res,
                "something went wrong, please try again."
              );
            } else {
              response.sendCreated(res, {
                data: { token, email, full_name },
                message: "logedin successfully.",
              });
            }
          }
        );
      }
    }
  });
};
