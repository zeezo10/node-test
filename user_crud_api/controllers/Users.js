
const { ObjectId } = require("mongodb");
const collection = require("../../config/mongodb").db.collection("Users");

module.exports = {

  getAllUsers: async (req, res) => {
    try {
      const users = await collection.find().toArray();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await collection.findOne({ _id: new ObjectId(req.params.id) });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || typeof age !== "number") {
      return res.status(400).json({ message: "Invalid input data" });
    }

    try {
      const newUser = { name, email, age };
      const result = await collection.insertOne(newUser);
      res.status(201).json({massage :`add user ${name} with ID ${result.insertedId} seccessful`});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  
  updateUser: async (req, res) => {
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

      res.status(200).json({massage :`update user whith ID ${result._id} seccessful`});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    const User_id = req.params.id
    try {
      const result = await collection.deleteOne({ _id: new ObjectId(User_id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: `User with ID ${User_id} deleted successfully` });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
