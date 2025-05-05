const studentRepository = require("../repositories/studentRepositories");
const { generateQrCode } = require("../utils/generateQrCode");
const { scanQrCode } = require("../utils/scanQrCode");
const fs = require("fs");
const path = require("path");

class QrCodeUsecase {
  async generateQrCode(serial_number) {
    if (!serial_number || typeof serial_number !== "string") {
      throw new Error("Invalid serial number");
    }
    const qrCodeBase64 = await generateQrCode(serial_number);

    const qrCodePath = `${serial_number}.png`;
    const fullPath = path.join(__dirname, "../public/uploads", qrCodePath);

    fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    fs.writeFileSync(
      fullPath,
      Buffer.from(qrCodeBase64.split(",")[1], "base64")
    );
    const qrCodeUrl = `/uploads/${qrCodePath}`;
    return qrCodeUrl;
  }

  async getQRCode(serial_number) {
    const qrCodePath = path.join(
      __dirname,
      "../public",
      `uploads/${serial_number}.png`
    );
    if (!fs.existsSync(qrCodePath)) {
      throw new Error("QR code not found");
    }
    return qrCodePath;
  }

  async scanQrCode(imagePath) {
    const decodedText = await scanQrCode(imagePath);
    if (!decodedText) {
      throw new Error("QR code not detected or unreadable");
    }
    const student = await studentRepository.findBySerialNumber(decodedText);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }

  async getStudentBySerialNumber(serial_number) {
    const student = await studentRepository.findBySerialNumber(serial_number);
    if (!student) {
      throw new Error("Student not found");
    }
    return student;
  }
}

module.exports = new QrCodeUsecase();
