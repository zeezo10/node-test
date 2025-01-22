const express = require("express");
const { ObjectId } = require("mongodb");
const UsersController = require("../controllers/Users.js");
const { validateUser } = require("../../middleware/validate.js");

const router = express.Router();
router.get("/users", UsersController.getAllUsers);
router.post("/users", validateUser, UsersController.createUser);

router.get("/users/:id", UsersController.getUserById);


router.put("/users/:id", validateUser, UsersController.updateUser);

router.delete("/users/:id", UsersController.deleteUser);

module.exports = router;
