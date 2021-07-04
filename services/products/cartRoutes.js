const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./userModel");
const Order = require("./orderModel");
const Cart = require("./cartModel");

// add item to cart
router.post("/addToCart", async (req, res) => {
  try {
    let { ItemName, ItemPrice, ItemDescription, ItemImage, username } = req.body;
    const cartItem = new Cart({
      _id: new mongoose.Types.ObjectId(),
      ItemName: ItemName,
      ItemPrice: ItemPrice,
      ItemDescription: ItemDescription,
      ItemImage: ItemImage
    });
    await cartItem.save();
    const userCart = User.updateOne({
      username: username,
    }, {
      $push: { cart: cartItem._id }
    })
    userCart.exec();
    res.status(200).json({ message: "added to cart" });
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

// get all items in cart
router.get("/getCart/:username", async (req, res) => {
  try {
    let { username } = req.params;
    const getUser = await User.findOne({ username: username });
    const cartItemsIds = getUser.cart;
    console.log(cartItemsIds);
    const results = await Cart.find({ _id: { $in: cartItemsIds } });
    console.log(results);
    res.status(201).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})
// get item from cart

// delete item in cart
router.delete("/deleteItem", async (req, res) => {
  try {
    let { id } = req.body;
    const deleteItem = await Cart.findOneAndDelete({ _id: id });
    res.status(201).json({ message: "removed from cart" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
})

module.exports = router;