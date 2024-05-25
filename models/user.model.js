const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter a name"],
    },
    age: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
    },
    image: {
      type: String,
      required: false,
    },
  },

  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
