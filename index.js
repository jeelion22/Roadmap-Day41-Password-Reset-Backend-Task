// import the mongoose module
const mongoose = require("mongoose");

// import config module
const config = require("./utils/config");

// import the app module
const app = require("./app");

console.log("connecting to MongoDB...");

// connect to MongoDB using mongoose
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB...");

    const PORT = config.MONGODB_PORT || 5500;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB...", error.message);
  });
