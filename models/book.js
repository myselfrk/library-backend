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
  console.log(this.branch_id.valueOf());
  BranchSchema.find({_id:this.branch_id.valueOf()},(err,data)=>{
    if(err || !data.length) next(err || "Invalid branch ID");
    next()
  })
});

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", BookSchema);
