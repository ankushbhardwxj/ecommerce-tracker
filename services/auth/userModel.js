const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
});

module.exports = mongoose.model("User", userSchema);
