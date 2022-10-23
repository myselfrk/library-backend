const mongoose = require("mongoose");

const BranchSchema = new mongoose.Schema(
  {
    branch_name: {
      type: String,
      unique: true,
      required: true,
    },
    soft_deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model("Branch", BranchSchema);
