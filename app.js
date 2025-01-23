const express = require("express");
// const { MongoClient } = require('mongodb');
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const router = require("./user_crud_api/routes/User");
const logger = require("./middleware/logger");
const connectToDB = require("./config/mongodb");
const User = require("./user_crud_api/models/User.model");
// const { errorHandler } = require("./user_crud_api/models/User.modeljs");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);


connectToDB()

app.use(router);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
