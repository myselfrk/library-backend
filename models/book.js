const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const BranchSchema = require("./branch");

const BookSchema = new mongoose.Schema(
  {
    book_name: {
      type: String,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
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
    soft_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

BookSchema.pre("save", function (next) {
  BranchSchema.find({ _id: this.branch.valueOf() }, (err, data) => {
    if (err || !data.length) next(err || "Invalid branch ID");
    next();
  });
});

BookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", BookSchema);
