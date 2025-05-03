// File: utils/sendQrCodeEmail.js
const nodemailer = require("nodemailer");

const sendQrCodeEmail = async (to, qrCodeBase64) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "Your QR Code",
      html: `<p>Your QR code:</p><img src="${qrCodeBase64}" alt="QR Code"/>`,
    });
  } catch (error) {
    throw new Error("Failed to send QR code email: " + error.message);
  }
};

module.exports = { sendQrCodeEmail };
