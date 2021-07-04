const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  orderItemName: { type: String, required: true },
  orderItemPrice: { type: Number, required: true },
  onTransit: { type: Boolean },
  delivered: { type: Boolean },
  coordinates: [{ lat: Number, long: Number, date: { type: Date, default: Date.now } }]
});

module.exports = mongoose.model("Orders", orderSchema);
