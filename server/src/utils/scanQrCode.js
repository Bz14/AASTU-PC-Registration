const jsQR = require("jsqr");
const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");

const scanQrCode = async (imagePath) => {
  try {
    const image = await loadImage(imagePath);
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(image, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    fs.unlinkSync(imagePath);
    if (!code) {
      return null;
    }
    return code.data;
  } catch (error) {
    throw new Error("Failed to scan QR code: " + error.message);
  }
};

module.exports = { scanQrCode };
