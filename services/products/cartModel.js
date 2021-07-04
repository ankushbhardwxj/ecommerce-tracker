const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  ItemName: { type: String, required: true },
  ItemPrice: { type: String, required: true },
  ItemDescription: { type: String },
  ItemImage: { type: String }
});

module.exports = mongoose.model("Cart", cartSchema);
