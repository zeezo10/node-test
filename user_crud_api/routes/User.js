const express = require("express");
const { ObjectId } = require("mongodb");
const collection = require("../../config/mongodb").db.collection("Users");
const Controller = require("../controllers/Users.js");

const router = express.Router();

router.get("/users", async (req, res) => {
  try {
    const users = await collection.find().toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/users", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || typeof age !== "number") {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const newUser = { name, email, age };

    const result = await collection.insertOne(newUser);
    res.status(201).json(result.ops[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/users/:id", async (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || typeof age !== "number") {
    return res.status(400).json({ message: "Invalid input data" });
  }

  try {
    const updatedUser = { name, email, age };
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedUser },
      { returnOriginal: false }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
