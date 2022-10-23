const mongoose = require("mongoose");

const librarianSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      immutable: true,
      required: true,
    },
    password:{
        type:String,
        required:true
    }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);




module.exports = mongoose.model("Librarian", librarianSchema);
