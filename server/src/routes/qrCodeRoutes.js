const express = require("express");
const router = express.Router();
const qrCodeController = require("../controllers/qrCodeController");
const authMiddleware = require("../middlewares/authMiddleware");
const validate = require("../middlewares/validate");
const { check } = require("express-validator");

router.get(
  "/qrcode/generate/:serial_number",
  authMiddleware,
  qrCodeController.generateQrCode
);
router.get(
  "/qrcode/image/:serial_number",
  authMiddleware,
  qrCodeController.getQRCode
);
router.post(
  "/qrcode/scan",
  authMiddleware,
  [
    check("admin_id").notEmpty().withMessage("Admin ID is required"),
    check("student_id").notEmpty().withMessage("Student ID is required"),
    check("pc_id").notEmpty().withMessage("PC ID is required"),
  ],
  validate,
  qrCodeController.scanQrCode
);
router.post(
  "/send-qr-code/:serial_number",
  authMiddleware,
  qrCodeController.sendQrCodeToEmail
);

module.exports = router;
