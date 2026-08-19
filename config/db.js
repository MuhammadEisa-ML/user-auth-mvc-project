const mongoose = require("mongoose");

async function connectDB() {
  if (!process.env.MONGODB_URI) {
    console.warn("MONGODB_URI is missing. Add it to .env before using authentication.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
}

module.exports = connectDB;