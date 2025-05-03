// File: controllers/pcController.js
const pcUsecase = require("../usecases/pcUsecase");

const getPCs = async (req, res) => {
  try {
    const pcs = await pcUsecase.getPCs();
    res.status(200).json(pcs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPCById = async (req, res) => {
  try {
    const pc = await pcUsecase.getPCById(req.params.id);
    res.status(200).json(pc);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const createPC = async (req, res) => {
  try {
    const pc = await pcUsecase.createPC(req.body);
    res.status(201).json(pc);
  } catch (error) {
    res
      .status(error.message.includes("Student not found") ? 400 : 400)
      .json({ error: error.message });
  }
};

const updatePC = async (req, res) => {
  try {
    const pc = await pcUsecase.updatePC(req.params.id, req.body);
    res.status(200).json(pc);
  } catch (error) {
    res
      .status(error.message.includes("PC not found") ? 404 : 400)
      .json({ error: error.message });
  }
};

const deletePC = async (req, res) => {
  try {
    await pcUsecase.deletePC(req.params.id);
    res.status(204).json(null);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getChartData = async (req, res) => {
  try {
    const chartData = await pcUsecase.getChartData();
    res.status(200).json(chartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getPCs,
  getPCById,
  createPC,
  updatePC,
  deletePC,
  getChartData,
};
