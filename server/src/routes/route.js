// File: server.js
const express = require("express");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoutes");
const pcRoutes = require("./routes/pcRoutes");
const qrCodeRoutes = require("./routes/qrCodeRoutes");
const studentRoutes = require("./routes/studentRoutes");
const errorHandler = require("./utils/errorHandler");
const path = require("path");
const connectToDb = require("../config/db");

dotenv.config();

const app = express();
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", adminRoutes);
app.use("/api", pcRoutes);
app.use("/api", qrCodeRoutes);
app.use("/api", studentRoutes);

app.use(errorHandler);

connectToDb();

module.exports = app;
