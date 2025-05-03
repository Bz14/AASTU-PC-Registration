const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminControllers");

const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../utils/fileUpload");
const { check } = require("express-validator");

const adminValidation = [
  check("admin_id").notEmpty().withMessage("Admin ID is required"),
  check("username").notEmpty().withMessage("Username is required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("email").optional().isEmail().withMessage("Invalid email"),
  check("phoneNumber")
    .optional()
    .isString()
    .withMessage("Phone number must be a string"),
];

const updateValidation = [
  check("username").optional().notEmpty().withMessage("Username is required"),
  check("password")
    .optional()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  check("email").optional().isEmail().withMessage("Invalid email"),
  check("phoneNumber")
    .optional()
    .isString()
    .withMessage("Phone number must be a string"),
];

router.post(
  "/admin/login",
  [
    check("username").notEmpty().withMessage("Username is required"),
    check("password").notEmpty().withMessage("Password is required"),
  ],
  adminController.login
);

router.get("/admins", authMiddleware, adminController.getAdmins);
router.get("/admins/search", authMiddleware, adminController.search);
router.get("/admins/:id", authMiddleware, adminController.getAdminById);
router.post(
  "/admins/register",
  authMiddleware,
  upload.single("profile_picture"),
  adminValidation,
  adminController.createAdmin
);
router.put(
  "/admins/:id",
  authMiddleware,
  upload.single("profile_picture"),
  updateValidation,
  adminController.updateAdmin
);
router.delete("/admins/:id", authMiddleware, adminController.deleteAdmin);

module.exports = router;
