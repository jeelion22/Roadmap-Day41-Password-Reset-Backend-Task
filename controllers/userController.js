// import the User model
const User = require("../models/user");

// import the bcrypt package
const bcrypt = require("bcrypt");

// import jwt
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../utils/config");

// define the user controller
const userController = {
  register: async (request, response) => {
    try {
      // get the user data from the request body
      const { name, username, password } = request.body;

      const user = await User.findOne({ username });

      if (user) {
        return response.status(400).json({ message: "User already exists" });
      }

      // hash the password
      const passwordHash = await bcrypt.hash(password, 10);

      // create a new user
      const newUser = new User({
        name,
        username,
        passwordHash,
      });

      //   save the user
      const savedUser = await newUser.save();

      //   return a success message with the user saved
      response
        .status(201)
        .json({ message: "User created successfully", user: savedUser });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  login: async (request, response) => {
    try {
      // get the username and password from the request body
      const { username, password } = request.body;

      // check if the user exists in the db
      const user = await User.findOne({ username });

      // if the user does not exist, return an error message
      if (!user) {
        return response.status(400).json({ message: "Invalid Credentials" });
      }

      // if the user exists, compare the password and check if it is correct
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user.passwordHash
      );

      // if the password is incorrect, return an error message
      if (!isPasswordCorrect) {
        return response.status(400).json({ message: "Invalid Credentials" });
      }

      //   if the password is correct, generate a token for the user and return it in
      // the response along with the success message
      const token = jwt.sign(
        {
          username: user.username,
          id: user._id,
          name: user.name,
        },
        JWT_SECRET
      );

      //   set a cookie with the token
      response.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours expiration
      });

      response.status(200).json({ message: "login successfull", token });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  //   get the current logged in user
  me: async (request, response) => {
    try {
      // get the user id from the request object
      const userId = request.userId;

      // find the user by id from the database
      const user = await User.findById(userId).select(
        "-_id -passwordHash -__v"
      );
      if (!user) {
        return response.status(400).json({ message: "User not found" });
      }

      response.status(200).json({ user });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // update the user details
  update: async (request, response) => {
    try {
      // get user id from the request object
      const userId = request.userId;

      // get the input from the request body
      const { name, username } = request.body;

      // get the user from the database

      const user = await User.findById(userId).select(
        "-_id -__v -passwordHash"
      );

      // if the user does not exist, return an error message

      if (!user) {
        return response.status(400).json({ message: "user not found" });
      }

      // update the user details
      if (name) {
        user.name = name;
      }
      if (username) {
        return response
          .status(409)
          .json({ message: "Username can't be changed" });
      }

      // save the user
      const updatedUser = await user.save();

      // return a success message with the updated user
      response
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });

      //
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
  delete: async (request, response) => {
    try {
      // get user id from request object
      const userId = request.userId;

      // delete the user from the database
      const deletedUser = await User.findByIdAndDelete({ userId });

      if (!deletedUser) {
        return response.status(400).json({ message: "User not found" });
      }

      // retuen a success message
      response.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },

  // logout the user
  logout: async (request, response) => {
    try {
      response.clearCookie("token");

      // return a success message
      response.status(200).json({ message: "logout successful" });
    } catch (error) {
      response.status(500).json({ message: error.message });
    }
  },
};

// export the controller
module.exports = userController;
