const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");

// get all deliveries (same as get all orders)
router.get("/", async (req, res) => {
  try {
    const getOrders = await Order.find();
    res.status(201).json(getOrders);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// get product info (get order info by id)
router.get("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getOrderInfo = await Order.find({ _id: id });
    res.status(201).json(getOrderInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// update onTransit bool
router.put("/item/updateTransit", async (req, res) => {
  try {
    const { id, onTransit } = req.body;
    const updateOrder = await Order.findOneAndUpdate({
      _id: id,
      onTransit: onTransit,
    }).exec();
    res.status(201).json({ message: "Order on Transit" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// update delivered bool
router.put("/item/updateItemDelivered", async (req, res) => {
  try {
    const { id, delivered } = req.body;
    const updateOrder = await Order.findOneAndUpdate({
      _id: id,
      delivered: delivered,
    }).exec();
    res.status(201).json({ message: "Order Delivered" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

// update order coordinatest
router.put("/item/updateCoordinates", async (req, res) => {
  try {
    let { id, lat, long } = req.body;
    await Order.findOneAndUpdate({ _id: id }, { lat: lat, long: long }).exec();
    res.status(201).json({ message: "cordinate update successful" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
});

module.exports = router;
