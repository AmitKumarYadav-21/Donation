const express = require("express");
const connectDB = require("./db");
const Donation = require("./donationModel");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Endpoint for Form Submission
app.post("/submit", async (req, res) => {
  try {
    const { name, address, mobile, message, type } = req.body;

    if (!name || !address || !mobile || !type) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const newDonation = new Donation({ name, address, mobile, message, type });
    await newDonation.save();

    res.status(201).json({ message: "Donation/Wastage Request Submitted Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting data", error });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
