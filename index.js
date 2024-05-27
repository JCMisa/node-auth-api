const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/user.model.js");
const userRoute = require("./routes/user.route.js");
const app = express();
const cors = require("cors");

// cors manipulation
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// middleware
app.use(express.json()); //to add record with json
app.use(express.urlencoded({ extended: false })); //to add record with forms

// routing
app.use("/api/users", userRoute);

//home
app.get("/", (req, res) => {
  res.send("Hello People");
});

mongoose
  .connect(
    "mongodb+srv://johncarlomisa:t7OZkYn3sOjkHdcB@node-auth-api.pubzit5.mongodb.net/Node-API?retryWrites=true&w=majority&appName=node-auth-api"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.log("Error: ", error);
  });
