const mongoose = require("mongoose");

const donorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  bloodGroup: String,
  city: String,
  lastDonationDate: Date,
  isAvailable: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Donor", donorSchema);