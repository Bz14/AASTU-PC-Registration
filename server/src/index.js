// File: server.js
const express = require("express");
const functions = require("firebase-functions");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const pcRoutes = require("./routes/pcRoutes");
const qrCodeRoutes = require("./routes/qrCodeRoutes");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./utils/errorHandler");
const path = require("path");
const connectToDb = require("./config/db");
const cors = require("cors");

const port = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.use("/api", adminRoutes);
app.use("/api", pcRoutes);
app.use("/api", qrCodeRoutes);
app.use("/api", studentRoutes);

app.use(errorHandler);

connectToDb();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

exports.api = functions.https.onRequest(app);
