const { ObjectId } = require("mongodb");
const User = require("../models/User.js");

class UsersController {
  async getAllUsers(req, res) {
    try {
      const users = await User.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await User.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createUser(req, res) {
    const existingUser = await User.getUserByEmail(req.body.email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const { name, email, age } = req.body;

    if (!name || !email || typeof age !== "number") {
      return res.status(400).json({ message: "Invalid input data" });
    }
    try {
      const newUser = await User.createUser({ name, email, age });

      res.status(201).json({
        message: `Added user ${newUser.name} with ID and UUID ${newUser.id} successfully`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateUser(req, res) {
    const { name, email, age } = req.body;

    if (!name || !email || typeof age !== "number") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    try {
      const result = await User.updateUser(req.params.id, {
        name,
        email,
        age,
      });

      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: `Update user with ID ${result._id} successful`,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteUser(req, res) {
    const User_id = req.params.id;
    try {
      const result = await User.deleteUser(User_id);
      if (!result) {
        return res.status(404).json({ message: "User not found" });
      }
      res
        .status(200)
        .json({ message: `User with ID ${User_id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new UsersController();
