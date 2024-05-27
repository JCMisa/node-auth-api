const express = require("express");
const User = require("../models/user.model.js");
const router = express.Router();

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authUser,
} = require("../controllers/user.controller.js");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", authUser);

module.exports = router;
