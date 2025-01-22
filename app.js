const express = require('express');
const { MongoClient } = require('mongodb'); // Changed from 'mongoose' to 'mongodb'
const dotenv = require('dotenv');
const router = require('./user_crud_api/routes/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


MongoClient.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then((client) => {
  console.log('Connected to MongoDB');
 
  app.use(router);
 
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
