const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const authMiddleware = require("../middlewares/authMiddlewares");
const validate = require("../middlewares/validate");
const { check } = require("express-validator");

const studentValidation = [
  check("student_name").notEmpty().withMessage("Student name is required"),
  check("phoneNumber").notEmpty().withMessage("Phone number is required"),
  check("email").isEmail().withMessage("Invalid email"),
  check("pc_brand").notEmpty().withMessage("PC brand is required"),
  check("serial_number").notEmpty().withMessage("Serial number is required"),
  check("pc_color").notEmpty().withMessage("PC color is required"),
  check("status").notEmpty().withMessage("Status is required"),
];

router.post(
  "/students/register",
  studentValidation,
  validate,
  studentController.register
);
router.get("/students/:id", authMiddleware, studentController.show);
router.get("/students", authMiddleware, studentController.showAll);
router.get("/students/search", authMiddleware, studentController.search);
router.put(
  "/students/:id",
  authMiddleware,
  studentValidation,
  validate,
  studentController.update
);
router.delete("/students/:id", authMiddleware, studentController.delete);
router.get(
  "/students/serial/:serial_number",
  authMiddleware,
  studentController.showBySerialNumber
);
router.get(
  "/students/qrcode/:id",
  authMiddleware,
  studentController.qrCodeGenerate
);

router.get("/user", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
