const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const BranchSchema = require("./branch");

const BookSchema = new mongoose.Schema({
  book_name: {
    type: String,
    required: true,
  },
  branch_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

BookSchema.pre('save', function(next) {

  next();

});

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", BookSchema);
