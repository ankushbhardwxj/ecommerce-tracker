const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");

// POST : adds an order to the database
router.post("/createOrder", async (req, res) => {
  try {
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      orderItemName: req.body.orderItemName,
      orderItemPrice: req.body.orderItemPrice,
      onTransit: req.body.onTransit,
      delivered: req.body.delivered,
      lat: req.body.lat,
      long: req.body.long,
    });
    await order.save();
    const user = User.updateOne(
      { username: req.body.username },
      { $push: { orders: order._id } }
    );
    user.exec();
    res.status(200).json({ message: "order created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});
// GET : get order details from data base
router.get("/getOrder", async (req, res) => {
  try {
    const getOrderInfo = await User.findOne({ username: req.body.username });
    const orders = getOrderInfo.orders;
    const results = await Order.find({ _id: { $in: orders } });
    res.status(201).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// PUT : fetch a order from database and update its cordinates
router.put("/updateOrder", async (req, res) => {
  try {
    await Order.findOneAndUpdate(
      { _id: req.body._id },
      { lat: req.body.lat, long: req.body.long }
    ).exec();
    res.status(201).json({ message: "cordinate update successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
