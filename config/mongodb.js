
require("dotenv").config();

const mongoose = require("mongoose");

const connectToDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL, {})
    .then((client) => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.error("Failed to connect to MongoDB", err);
    });
};

module.exports = connectToDB;
