const qrCodeUsecase = require("../usecases/qrCodeUsecase");

const generateQrCode = async (req, res) => {
  try {
    const qrCodeUrl = await qrCodeUsecase.generateQrCode(
      req.params.serial_number
    );
    res.status(200).json({ qrCodeUrl });
  } catch (error) {
    console.error("QR Code Generation Error:", error.message);
    res
      .status(error.message.includes("Invalid") ? 400 : 500)
      .json({ error: error.message });
  }
};

const getQRCode = async (req, res) => {
  try {
    const qrCodePath = await qrCodeUsecase.getQRCode(req.params.serial_number);
    res.sendFile(qrCodePath);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const scanQrCode = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Invalid file upload" });
    }
    const student = await qrCodeUsecase.scanQrCode(req.file.path);
    res.status(200).json(student);
  } catch (error) {
    console.error("QR Code Scanning Error:", error.message);
    res
      .status(error.message.includes("not found") ? 404 : 400)
      .json({ error: error.message });
  }
};

const showBySerialNumber = async (req, res) => {
  try {
    const student = await qrCodeUsecase.getStudentBySerialNumber(
      req.params.serial_number
    );
    res.status(200).json(student);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const sendQrCodeToEmail = async (req, res) => {
  try {
    const { serial_number } = req.params;
    const qrCodeUrl = await qrCodeUsecase.generateQrCode(serial_number);
    res.status(200).json({ message: "QR code sent to email", qrCodeUrl });
  } catch (error) {
    console.error("Email Sending Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};
module.exports = {
  generateQrCode,
  getQRCode,
  scanQrCode,
  showBySerialNumber,
  sendQrCodeToEmail,
};
