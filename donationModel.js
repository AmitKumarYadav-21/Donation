const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  mobile: { type: String, required: true },
  message: { type: String },
  type: { type: String, required: true, enum: ["donation", "wastage"] },
  date: { type: Date, default: Date.now }
});

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
