const mongoose = require("mongoose");
const { config } = require("dotenv");
config();

const connectToDb = async () => {
  try {
    const URI = process.env.MONGO_URI;
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

module.exports = connectToDb;
