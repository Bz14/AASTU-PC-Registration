const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    admin_id: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["super_admin", "admin"], required: true },
    email: { type: String, required: true, unique: true },
    profile_picture: { type: String },
    phoneNumber: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
