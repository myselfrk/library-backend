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

module.exports = mongoose.model("Branch", BranchSchema);

