const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true, unique: true },
    student_name: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pc_brand: { type: String, required: true },
    serial_number: { type: String, required: true },
    pc_color: { type: String, required: true },
    qr_code: { type: String, required: true },
    status: { type: String, required: true },
    pc_id: { type: String, ref: "PC" },
  },
  { timestamps: true, _id: false }
);

module.exports = mongoose.model("Student", studentSchema);
