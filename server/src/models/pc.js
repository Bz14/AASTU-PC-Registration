const mongoose = require("mongoose");

const pcSchema = new mongoose.Schema(
  {
    serial_number: { type: String, required: true },
    owner_id: { type: String, ref: "Student", required: true },
    pc_brand: { type: String, required: true },
    pc_color: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PC", pcSchema);
