const User = require("../models/User.model.js");
const { v4: uuidv4 } = require("uuid");

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getUserById(req, res) {
    const id = req.params.id;
    try {
      const user = await User.findOne({
        id: id,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      if (error) {
        res.status(500).json({ message: error.message });
      }
    }
  }

  async createUser(req, res) {
    const { name, email, age } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    try {
      const newUser = await User.create({ id: uuidv4(), name, email, age });

      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    const { name, email, age } = req.body;
    const id = req.params.id;

    const updatedUser = {
      name:name,
      email:email,
      age:age,
    };

    try {
      const result = await User.findOneAndUpdate(
        { id: id },
        { $set: updatedUser },
        { returnOriginal: false, returnDocument: "after" }
      );

      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    const id = req.params.id;
    try {
      const result = await User.deleteOne({ id: id });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: `User deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
