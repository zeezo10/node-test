const { ObjectId } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const collection = require("../../config/mongodb_Test").db.collection("users");
// const collection = require("../../config/mongodb").db.collection("Users");

class User {
  static async getUsers() {
    const result = await collection.find().toArray();
    return result;
  }

  static async getUserByEmail(email) {
    const result = await collection.findOne({ email });
    return result;
  }

  static async getUserById(id) {
    const result = await collection.findOne({
      id:(id),
    });
    return result;
  }

  static async createUser(userData) {
    const { name, email, age } = userData;
    const newUser = {
      id: uuidv4(),
      name,
      email,
      age,
    };
    await collection.insertOne(newUser);
    return newUser;
  }

  static async updateUser(id, userData) {
    const updatedUser = {
      name: userData.name,
      email: userData.email,
      age: userData.age,
    };
    const result = await collection.findOneAndUpdate(
      { id: (id) },
      { $set: updatedUser },
      { returnOriginal: false, returnDocument: "after" }
    );
    return result;
  }

  static async deleteUser(userId) {
    const result = await collection.deleteOne({ id:(userId) });
    return result.deletedCount > 0;
  }
}

module.exports = User;
