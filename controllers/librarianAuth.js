const jwt = require('jsonwebtoken');
const Librarian = require("../models/librarian");

exports.create = function (req, res) {
    const {password,email,full_name} = req.body;
    const hashPassword = jwt.sign(password,config.key.privateKey)
    console.log(hashPassword);
    res.send("");
    
    
    
//   const librarian = new Librarian(req.body);
//   librarian.save(function (err, data) {
//     if (err) return response.sendBadRequest(res, err);
//     response.sendCreated(res, { data, message: "Added." });
//   });
};