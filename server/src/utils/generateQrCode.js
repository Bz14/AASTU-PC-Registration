const QRCode = require("qrcode");

const generateQrCode = async (data) => {
  try {
    return await QRCode.toDataURL(data, { width: 300 });
  } catch (error) {
    throw new Error("Failed to generate QR code");
  }
};

module.exports = { generateQrCode };
