const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderItemName: { type: String, required: true },
  orderItemPrice: { type: Number, required: true },
  onTransit: { type: Boolean },
  delivered: { type: Boolean },
  lat: { type: Number, required: true },
  long: { type: Number, required: true },
});
module.exports = mongoose.model("Orders", orderSchema);
