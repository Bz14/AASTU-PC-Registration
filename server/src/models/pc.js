const mongoose = require("mongoose");

const pcSchema = new mongoose.Schema(
  {
    pc_id: { type: String, required: true, unique: true },
    serial_number: { type: String, required: true },
    owner_id: { type: String, ref: "Student", required: true },
    pc_brand: { type: String, required: true },
    pc_color: { type: String, required: true },
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model("PC", pcSchema);
