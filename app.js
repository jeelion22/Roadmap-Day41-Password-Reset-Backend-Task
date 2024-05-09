// import express library
const express = require("express");

// import the user routes
const userRouter = require("./routes/userRoutes");

// create an express app
const app = express();

// require cors
const cors = require("cors");

// require cookie-parser
const cookieParser = require("cookie-parser");

// requrie morgan
const morgan = require("morgan");

// user cors middleware
app.use(
  cors({
    origin: "https://user-mangement-react-app.netlify.app",

    credentials: true,
  })
);

app.use((req, res, next) => {
  req.header(
    "Access-Control-Allow-Origin",
    "https://user-mangement-react-app.netlify.app"
  );
  res.head(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// use the cookie-parser middleware
app.use(cookieParser());

// user the morgan middleware
app.use(morgan("dev"));

// use the express json middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.head("/api", (request, response) => {
  res.send("Welcome to the user login portal");
});

// define endpoints
app.use("/api/users", userRouter);

// export the app module
module.exports = app;
