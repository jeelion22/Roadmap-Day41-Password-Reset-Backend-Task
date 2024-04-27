// import mongoose
const mongoose = require("mongoose");

// create a schema for a user

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  passwordHash: { type: String, required: true },
});

// create a model from the userSchema and export it
module.exports = mongoose.model("User", userSchema, "users");
