const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    permission_id: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Permission" },
    ],
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
