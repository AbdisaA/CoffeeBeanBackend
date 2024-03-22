const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, Required: true, unique: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String },
    role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
