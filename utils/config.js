// require dotenv library
require("dotenv").config();

// create configuration variables for db
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_PORT = process.env.MONGODB_PORT;
const JWT_SECRET = process.env.JWT_SECRET;


// export all these configuration variables
module.exports = {
  MONGODB_URI,
  MONGODB_PORT,
  JWT_SECRET,
};
