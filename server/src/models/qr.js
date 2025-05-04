const mongoose = require("mongoose");

const qrCodeScanSchema = new mongoose.Schema(
  {
    admin_id: { type: String, ref: "Admin", required: true },
    student_id: { type: String, ref: "Student", required: true },
    pc_id: { type: String, ref: "PC", required: true },
    scan_time: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRCodeScan", qrCodeScanSchema);
