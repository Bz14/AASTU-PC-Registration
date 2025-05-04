const express = require("express");
const router = express.Router();
const pcController = require("../controllers/pcController");
const authMiddleware = require("../middlewares/authMiddlewares");
const validate = require("../middlewares/validate");
const { check } = require("express-validator");

const pcValidation = [
  check("serial_number").notEmpty().withMessage("Serial number is required"),
  check("owner_id").notEmpty().withMessage("Owner ID is required"),
  check("pc_brand").notEmpty().withMessage("PC brand is required"),
  check("pc_color").notEmpty().withMessage("PC color is required"),
];

router.get("/pcs", authMiddleware, pcController.getPCs);
router.get("/pcs/:id", authMiddleware, pcController.getPCById);
router.post(
  "/pcs",
  authMiddleware,
  pcValidation,
  validate,
  pcController.createPC
);
router.put(
  "/pcs/:id",
  authMiddleware,
  pcValidation,
  validate,
  pcController.updatePC
);
router.delete("/pcs/:id", authMiddleware, pcController.deletePC);
router.get("/chart-data", authMiddleware, pcController.getChartData);

module.exports = router;
