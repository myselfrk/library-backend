const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const BranchSchema = require("./branch");
const BookSchema = require("./book");

const studentSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      trim: true,
      required: true,
    },
    branch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      immutable: true,
      required: true,
    },
    issued_books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    ],
    soft_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

studentSchema.pre("save", function (next) {
  BranchSchema.find({ _id: this.branch.valueOf() }, (err, data) => {
    if (err || !data.length) next(err || "Invalid branch ID");
    BookSchema.find(
      { _id: { $in: this.issued_books.valueOf() } },
      (err, data) => {
        if (err || !data.length) next(err || "Invalid book ID");
      }
    );
    next();
  });
});

studentSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Student", studentSchema);
