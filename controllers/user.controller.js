const User = require("../models/user.model.js");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// create user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);

    if (!user) {
      return res
        .status(404)
        .json({ message: "Failed to updated missing user" });
    } else {
      const updatedUser = await User.findById(id);
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      } else {
        res.status(200).json(updatedUser);
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({
        message: "User with id: {" + id + "} was deleted successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// auth login
async function validateCredentials(email) {
  try {
    // 1. Retrieve user record from database based on email
    const user = await User.findOne({ email }); // Check for existing email equal to usser input

    if (user) {
      return true; // User not found
    }
  } catch (error) {
    console.error("Error validating credentials:", error);
    return false; // Handle errors gracefully
  }
}

const authUser = async (req, res) => {
  const { email } = req.body;

  try {
    const isValidLogin = await validateCredentials(email);

    if (isValidLogin) {
      res.status(200).json({
        message: "User logged in successfully",
      });
    } else {
      res
        .status(404)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  authUser,
};
