const express = require("express");
const { ObjectId } = require("mongodb");
const UserController = require("../controllers/Users.js");

const router = express.Router();
router.get("/users", UserController.getAllUsers);

router.get("/users/:id", UserController.getUserById);

router.post("/users", UserController.createUser);

router.put("/users/:id", UserController.updateUser);

router.delete("/users/:id", UserController.deleteUser);
  

module.exports = router;
