const studentUsecase = require("../usecases/studentUsecase");

const register = async (req, res) => {
  try {
    const { student, pc } = await studentUsecase.register(req.body);
    res.status(201).json({ student, pc });
  } catch (error) {
    console.log(req.body);
    console.error("Error in register:", error);
    res.status(400).json({ error: error.message });
  }
};

const search = async (req, res) => {
  try {
    const students = await studentUsecase.search(req.query.search || "");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showAll = async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const students = await studentUsecase.getAll(searchQuery);
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const show = async (req, res) => {
  try {
    const { student, pc } = await studentUsecase.getById(req.params.id);
    res.status(200).json({ student, pc });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const { student, pc } = await studentUsecase.update(
      req.params.id,
      req.body
    );
    res
      .status(200)
      .json({ message: "Student updated successfully", student, pc });
  } catch (error) {
    console.error("Error in update:", error);
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await studentUsecase.delete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const qrCodeGenerate = async (req, res) => {
  try {
    const qrCodeUrl = await studentUsecase.generateQrCode(req.params.id);
    res.status(200).json({ qrCodeUrl });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const showBySerialNumber = async (req, res) => {
  try {
    const student = await studentUsecase.getBySerialNumber(
      req.params.serial_number
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  register,
  search,
  showAll,
  show,
  update,
  delete: deleteStudent,
  qrCodeGenerate,
  showBySerialNumber,
};
