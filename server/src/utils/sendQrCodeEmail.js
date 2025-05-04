// File: utils/sendQrCodeEmail.js
const nodemailer = require("nodemailer");

const sendQrCodeEmail = async (to, qrCodeBase64) => {
  console.log(to, qrCodeBase64);
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
      html: `<p>Your QR code:</p><img src="cid:qrcode"/>`,
      attachments: [
        {
          filename: "qrcode.png",
          content: qrCodeBase64.split(",")[1],
          encoding: "base64",
          cid: "qrcode",
        },
      ],
    });
  } catch (error) {
    throw new Error("Failed to send QR code email: " + error.message);
  }
};

module.exports = { sendQrCodeEmail };
