const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    branch_name: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

BranchSchema.pre("deleteOne", function (next) {
  const branch_id = this.getFilter()["_id"]; 
  BookSchema.deleteMany({ branch_id }, function (err, data) {
    if (err)
      next(err || "Something went wrong, couldn't delete respective books.");
    next();
  });
});

module.exports = mongoose.model("Branch", BranchSchema);

const BookSchema = require("./book");   // to avoid circular dependency error
