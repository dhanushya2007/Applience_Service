// Models/BookingModel.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, "Customer name is required"],
    trim: true,
    minlength: [3, "Minimum 3 characters required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  applianceName: {
    type: String,
    required: [true, "Appliance name is required"],
  },
  image: {
    type: String,
  },
  date: {
    type: String,
    required: [true, "Service date is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  serviceType: {
    type: String,
    enum: ["Repair", "Installation", "Maintenance"],
    default: "Repair",
  },
  timeSlot: {
    type: String,
    enum: ["Morning", "Afternoon", "Evening"],
    default: "Morning",
  },
  cost: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Completed", "Cancelled"],
    default: "Pending",
  },
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
