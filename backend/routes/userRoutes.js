const express = require("express"); // Import Express.js
const userRouter = express.Router(); // Create an instance of an Express Router
const mongoose = require("mongoose"); // Import Mongoose library
const User = require("../models/User"); // Import the User model for database operations
const bcrypt = require("bcrypt"); // Import Bcrypt library for password hashing

// Route for changing user passwords
userRouter.post("/change-password", async (req, res) => {
  try {
    // Find the user with the provided email in the request body
    const user = await User.findOne({ email: req.body.email });

    // Compare the provided current password with the hashed password stored in the database
    const passCompare = await bcrypt.compare(
      req.body.currentPass,
      user.password
    );

    // If the passwords don't match, respond with an error
    if (!passCompare) {
      console.log("Password is not associated with such user email");
      res
        .status(403)
        .send({ message: "The provided password does not match the user" });
      return;
    }

    // Hash the new password provided in the request body
    const newPassword = await bcrypt.hash(req.body.newPass, 10);

    // Update the user's password with the new hashed password
    const result = await User.findOneAndUpdate(
      { email: user.email },
      { password: newPassword }
    );

    // Check if the password update was successful and respond accordingly
    if (result) {
      res.status(200).send({ message: "Successfully updated password" });
    } else {
      res.status(400).send({ message: "Failed to update to new password" });
    }
  } catch (error) {
    // If any error occurs during the process, respond with a 500 Internal Server Error
    res.status(500).send({ message: "500 Internal Server Error" });
  }
});

module.exports = userRouter;
