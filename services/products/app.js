const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
});
mongoose.set("debug", true);
const db = mongoose.connection;
db.on("error", () => console.log("FAILED TO CONNECT TO ATLAS"));
db.once("open", () => console.log("SUCCESSFULLY CONNECTED TO ATLAS"));

app.use(bodyParser.urlencoded({ extended: false }));
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

// controllers
app.use("/api/order", require("./productRoutes"));
app.use("/api/cart", require("./cartRoutes"));

// start server
app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
  console.log("/api/order/createOrder");
  console.log("/api/order/getOrder");
  console.log("/api/order/updateOrder");
  console.log("/api/cart/addToCart");
  console.log("/api/cart/getCart");
  console.log("/api/cart/deleteItem");
});
