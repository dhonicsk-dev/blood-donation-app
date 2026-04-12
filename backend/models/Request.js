const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  requesterId: String,
  bloodGroup: String,
  city: String,
  hospital: String,
  status: { type: String, default: "PENDING" },
});

module.exports = mongoose.model("Request", requestSchema);