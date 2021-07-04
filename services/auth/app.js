const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});

mongoose.set("debug", true);
const db = mongoose.connection;
db.on("error", () => console.log("FAILED TO CONNECT TO ATLAS!"));
db.once("open", () => console.log("SUCCESSFULLY CONNECTED TO ATLAS!"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/api/auth", require("./authRoutes"));

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
  console.log("/api/auth/signup");
  console.log("/api/auth/signin");
});
