// File: controllers/adminController.js
const adminUsecase = require("../usecases/adminUsecase");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const admin = await adminUsecase.login(req.body);
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "15d" }
    );
    res
      .status(200)
      .json({ admin: { ...admin.toObject(), password: undefined }, token });
  } catch (error) {
    res
      .status(error.message.includes("Invalid credentials") ? 401 : 403)
      .json({ message: error.message });
  }
};

const getAdmins = async (req, res) => {
  const searchQuery = req.query.search || "";
  try {
    const admins = await adminUsecase.getAdmins(searchQuery);
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAdminById = async (req, res) => {
  try {
    const admin = await adminUsecase.getAdminById(req.params.id);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createAdmin = async (req, res) => {
  try {
    const data = {
      ...req.body,
      profile_picture: req.file
        ? `/uploads/${req.file.filename}`
        : req.body.profile_picture,
    };
    const admin = await adminUsecase.createAdmin(data);
    res.status(201).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const data = {
      ...req.body,
      profile_picture: req.file
        ? `/uploads/${req.file.filename}`
        : req.body.profile_picture,
    };
    const admin = await adminUsecase.updateAdmin(req.params.id, data);
    res.status(200).json(admin);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    await adminUsecase.deleteAdmin(req.params.id);
    res.status(204).json(null);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getChartData = async (req, res) => {
  try {
    const chartData = await adminUsecase.getChartData();
    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const search = async (req, res) => {
  try {
    const { query } = req.query;
    const admins = await adminUsecase.search(query);
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const createSuperAdmin = async (req, res) => {
  try {
    const superAdmin = await adminUsecase.createSuperAdmin(req.body);
    res.status(201).json(superAdmin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  login,
  getAdmins,
  getAdminById,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  getChartData,
  search,
  createSuperAdmin,
};
